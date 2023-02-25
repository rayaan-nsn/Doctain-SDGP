import os
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('AdminPage.html')

@app.route('/addDoctor')
def addDoctor():
   return render_template('AddDoctor.html')

if __name__ == '__main__':
   app.run(debug=True)
