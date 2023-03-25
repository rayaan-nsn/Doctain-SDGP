# import json
# import os
from flask import Flask, redirect, render_template, request, jsonify, url_for, session
import pandas as pd
from sklearn.naive_bayes import GaussianNB
# from flask_mysqldb import MySQL
# import MySQLdb.cursors
# import re
import sqlite3

app = Flask(__name__)
app.secret_key = 'secret key'
DB_PATH = "./static/db/doctain.db"


# create the connection object to the database
def create_connection():
    conn = sqlite3.connect(DB_PATH)
    return conn


# --------------------------------------Disease Prediction using ML---------------------------------------------------------------------------------------------------------------

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


# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Multiple users login to the system connected with MySQL database

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
            cursor.execute('SELECT * FROM userdetails WHERE (username = ? OR email = ?) AND password = ?',
                           (username, username, password,))
            account = cursor.fetchone()

            # If account exists in user details table in our database
            if account:
                session['loggedin'] = True
                session['id'] = account[0]
                session['username'] = account[1]

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

@app.route('/home')
def home():
    if 'loggedin' in session:
        return render_template('home.html', username=session['username'])
    # User is not loggedin redirect to login page
    return redirect(url_for('login'))


@app.route('/faq')
def faq():
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

    # print(
    #     f"First Name: {fname}\nLast Name: {lname}\nEmail: {email}\nAge: {age}\nSpecialization: {specialization}\nPhonenumber: {phonenumber}\nAddress: {address}")
    # return jsonify({'success': True})


@app.route('/seedocs')
def seedocs():
    conn = create_connection()
    cur = conn.cursor()
    doctors = cur.execute("SELECT * FROM doctorsdetails")

    if doctors > 0:
        doctorDetails = cur.fetchall()
        return render_template('SeeDoctors.html', doctorDetails=doctorDetails)
    else:
        return "No doctors found"
    cur.close()
    conn.close()


if __name__ == '__main__':
    app.run(debug=True)
