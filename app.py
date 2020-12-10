from flask import Flask, render_template
import pickle
import numpy as np

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/draw', methods = ['POST', 'GET'])
def drawAndPredict():
    return 

@app.route('/upload', methods = ['POST', 'GET'])
def uploadAndPredict():
    return

if __name__ == "__main__":
    app.run()