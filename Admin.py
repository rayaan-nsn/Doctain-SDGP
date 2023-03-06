import os
from flask import Flask, render_template, request , redirect, url_for
from flask import jsonify
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('AdminPage.html')

@app.route('/addDoctor',methods=["GET","POST"])
def addDoctor():
   return render_template('AddDoctor.html')

@app.route('/save', methods=["GET","POST"])
def save():

    userInput = request.form
    return render_template('test.html', userInput=userInput)
    

# #method to send doctor register form data to backend
# @app.route('/handle_data', methods=['POST'])
# def handle_data():
#    projectpath = request.form['projectFilepath']

if __name__ == '__main__':
   app.run(debug=True)