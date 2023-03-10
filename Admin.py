import os
from flask import Flask, render_template, request , redirect, url_for, jsonify
from flask import jsonify
app = Flask(__name__)

@app.route('/Admin')
def home():
   return render_template('AdminPage.html')

@app.route('/addDoctor',methods=["GET","POST"])
def addDoctor():
   return render_template('AddDoctor.html')


@app.route('/save', methods=['POST'])
def save():
    json_payload = request.get_json()
    name = json_payload['Firstname']
    email = json_payload['Lastname']
    # Do something with name and email...
    return jsonify({'success': True})

    
if __name__ == '__main__':
   app.run(debug=True)