from flask import Flask, render_template, request, redirect, url_for
import pickle
import numpy as np

app = Flask(__name__, template_folder='templates')
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/', methods = ['POST', 'GET'])
def index():
        return render_template('index.html')

@app.route('/draw')
def draw():
    return render_template('draw.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

if __name__ == "__main__":
    app.run(debug=True)