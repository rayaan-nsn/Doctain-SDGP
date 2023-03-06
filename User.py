import os
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('home.html')

@app.route('/faq')
def faq():
   return render_template('faq.html')

@app.route('/contactUs')
def contactUs():
   return render_template('contact.html')

@app.route('/user_input', methods=['POST'])
def receive_user_input():
    global input_value, diseases, doctors
    if request.method == 'POST':
        user_input = request.json  # assuming input is sent as a JSON array
        # do something with user input, e.g. store it in a database
        for input_value in user_input:
            print(input_value)
        if len(input_value) > 0:
            diseases = ['High Blood Pressure', 'Diabetes', 'Asthma', 'Migraine']
            doctors = ['Dr. Patel', 'Dr. Namal', 'Dr. John']
        return jsonify({
            'message': 'User input received successfully.',
            'disease': diseases,
            'doctors': doctors
        })

if __name__ == '__main__':
   app.run(debug=True)


