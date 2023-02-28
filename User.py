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
    if request.method == 'POST':
        user_input = request.json  # assuming input is sent as a JSON array
        # do something with user input, e.g. store it in a database
        for input_value in user_input:
            print(input_value)
        return jsonify({'message': 'User input received successfully.'})

if __name__ == '__main__':
   app.run(debug=True)
