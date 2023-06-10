# import json
# import os
# from ast import Constant
# import base64
# from collections import UserDict
# from curses import flash
from functools import wraps
# from io import BytesIO
# from msilib.schema import tables
import os
# from tkinter import Image
from flask import Flask, Response, current_app, redirect, render_template, request, jsonify, send_file, url_for, session
import pandas as pd
# from platformdirs import user_log_path
from sklearn.naive_bayes import GaussianNB
# from flask_mysqldb import MySQL
# simport MySQLdb.cursors
# import re
import sqlite3

app = Flask(__name__)
app.secret_key = 'secret key'
DB_PATH = "./static/db/doctain.db"


# create the connection object to the database
def create_connection():
    conn = sqlite3.connect(DB_PATH)
    return conn

def login_not_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "logged_in" in session:
            return redirect(url_for("home"))
        else:
            return f(*args, **kwargs)
    return decorated_function
# --------------------------------------------------------------------Disease Prediction using ML---------------------------------------------------------------------------------------------

def predict_disease(user_symptoms):
    # Load the training and the testing dataset from the CSV file
    train_dataset = pd.read_csv('./static/dataset/training_dataset (non_com).csv')
    test_dataset = pd.read_csv('./static/dataset/testing_dataset (non_com).csv')

    # Separate the symptoms from the disease labels in the training dataset and in the testing dataset
    X_train = train_dataset.iloc[:, 1:]
    y_train = train_dataset.iloc[:, 0]
    X_test = test_dataset.iloc[:, 1:]
    y_test = test_dataset.iloc[:, 0]

    # Create a Naive Bayes classifier and fit it to the training data
    model = GaussianNB()
    model.fit(X_train, y_train)

    # Use the model to predict the disease based on user input
    symptoms_dict = {symptom: 1 for symptom in user_symptoms}
    user_input = pd.DataFrame(symptoms_dict, index=[0])
    missing_cols = set(X_train.columns) - set(user_input.columns)
    for col in missing_cols:
        user_input = pd.concat([user_input, pd.DataFrame({col: [0]})], axis=1)
    user_input = user_input[X_train.columns]

    # Predict the probability of each disease given the user input
    disease_probs = model.predict_proba(user_input)[0]
    disease_indices = model.classes_

    # Sort the probabilities in descending order and get the top 5 predicted diseases
    n_top = 5
    top_indices = disease_probs.argsort()[::-1][:n_top]

    # Get the most likely disease and matching other diseases
    predicted_disease = disease_indices[top_indices[0]]
    matching_diseases = []
    for i in range(1, n_top):
        if disease_probs[top_indices[i]] > 0:
            matching_diseases.append(disease_indices[top_indices[i]])

    # print(predicted_disease)
    # print(matching_diseases)

    return predicted_disease, matching_diseases


# -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Multiple users login to the system connected with MySQL database
with app.app_context():
    current_app.authenticated_username = None

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']

        # if the admin enters correct username and the password system directs into admin page else search from the database
        if username == "doctainadmin" and password == "admin123":
            return redirect(url_for('admin'))
        else:
            # Check if account exists using SQLite database
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM usersdetails1 WHERE (username = ? OR email = ?) AND password = ?',
                           (username, username, password,))
            account = cursor.fetchone()

            # If account exists in user details table in our database
            if account:
                session['loggedin'] = True
                session['id'] = account[0]
                session['username'] = account[1]
                with app.app_context():
                    current_app.authenticated_username = account[1]

                # Redirect to home page
                return redirect(url_for('home'))
            else:
                # Account doesn't exist or username/password is incorrect
                print('Incorrect username/password!')

            # Close connection and cursor
            cursor.close()
            conn.close()

    return render_template('login.html')
    
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

@app.route('/signup', methods=["GET", "POST"])
def signup():
    return render_template('signup.html')

@app.route('/registeruser', methods=["POST"])
def registeruser():
    data = request.get_json()
    name = data['Name']
    email = data['Email']
    country = data['Country']
    bday = data['Birthdate']
    gender = data['Gender']
    username=data['Username']
    password=data['Password']
    bookmark='dummy'
   
    conn = create_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO usersdetails1 (username,password,name,email,country,birthday,gender,bookmark) VALUES (?,?,?,?,?,?,?,?)",
        (username,password,name,email,country,bday,gender,bookmark))
    conn.commit()
    cur.close()
    conn.close()
    print ('added user sucessfully!')
    return ('added user sucessfully!')

#----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
@app.route('/forgetpw')
def forgetpw():
    return render_template('forgetpw.html')

@app.route('/home')
def home():
    if 'username' in session:
        return render_template('home.html', username=session['username'])
    # User is not loggedin redirect to login page
    return redirect(url_for('login'))


@app.route('/faq')
def faq():
    print(current_app.authenticated_username)
    return render_template('faq.html')


@app.route('/contactUs')
def contactUs():
    return render_template('contact.html')


@app.route('/user_input', methods=['POST'])
def receive_user_input():
    if request.method == 'POST':
        user_symptoms = request.json  # assuming input is sent as a JSON array
        predicted_disease, matching_diseases = predict_disease(user_symptoms)

        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute(
            "SELECT firstname, lastname, email, phonenumber, address FROM doctorsdetails WHERE specialization = ?",
            (predicted_disease,))

        doctors = []
        for row in cur.fetchall():
            doctor = {
                'firstname': row[0],
                'lastname': row[1],
                'email': row[2],
                'phonenumber': row[3],
                'address': row[4]
            }
            doctors.append(doctor)

        cur.close()
        conn.close()
        return jsonify({
            'message': 'User input received successfully.',
            'predicted_disease': predicted_disease,
            'matching_diseases': matching_diseases,
            'doctors': doctors
        })


@app.route('/admin')
def admin():
    return render_template('AdminPage.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/addDoctor', methods=["GET", "POST"])
def addDoctor():
    return render_template('AddDoctor.html')


@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    fname = data['Firstname']
    lname = data['Lastname']
    email = data['Email']
    age = data['Age']
    specialization = data['Specialization']
    phonenumber = data['Phonenumber']
    address = data['Address']

    conn = create_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO doctorsdetails (firstname,lastname,email,age,specialization,phonenumber,address) VALUES (?,?,?,?,?,?,?)",
        (fname, lname, email, age, specialization, phonenumber, address))
    conn.commit()
    cur.close()
    conn.close()
    return ('added doctor sucessfully!')
   

@app.route('/seedocs')
def seedocs():
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM doctorsdetails")
    rows = cur.fetchall()

    return render_template('SeeDoctors.html', rows=rows)

#-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#Define the route for the image upload web page
# Get the absolute path of the current directory
dir_path = os.path.dirname(os.path.realpath(__file__))

# Specify the name and path of the database file
db_file = os.path.join(dir_path, 'doctain.db')

# Create a connection to the database using the absolute path
conn = sqlite3.connect(db_file)

# Define the route for the image upload page
@app.route('/upload')
def upload():
    return render_template('presUpload.html')

# Define the route for handling the image upload
@app.route('/upload_file', methods=['GET','POST'])
def upload_file():
    file = request.files['file']
    name = file.filename
    data = file.read()
    username=current_app.authenticated_username

    conn = create_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO prescriptionimages (name, data,usernamep) VALUES (?,?, ?)', (name, data,username))
    cur.close()
    conn.commit()
    conn.close()
    return 'File uploaded successfully!'
#----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# @app.route('/getimage', methods=['GET','POST'])
# def getimage():
#     conn = sqlite3.connect('doctain.db')
#     cursor = conn.cursor()
#     username=current_app.authenticated_username
#     print(current_app.authenticated_username)
#     # Retrieve the image data from the database
#     cursor.execute('SELECT data FROM prescriptionimages WHERE usernamep = ?', (username,))
#     image_data = cursor.fetchone()[0]

#     # Create a Flask response object with the image data
#     response = Response(image_data, mimetype='image/png')

#     # Render the image in an HTML template
#     return render_template('showPrescription.html', image=response)


# @app.route('/show-image/<int:image_id>')
# def show_image(image_id):
#     # Retrieve the image data from the database
#     conn = sqlite3.connect('doctain.db')
#     cursor = conn.cursor()
#     cursor.execute('SELECT data, mimetype FROM prescriptionimages WHERE id = ?', (image_id,))
#     image_data, mimetype = cursor.fetchone()

#     # Create a Flask response object with the image data
#     response = Response(image_data, mimetype=mimetype)

#     # Render the image in an HTML template
#     return render_template('showPrescription.html', image=response)

#----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True)
