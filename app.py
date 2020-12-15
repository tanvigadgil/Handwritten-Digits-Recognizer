from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from PIL import Image
import plotly.graph_objs as go
import plotly.offline as plt
import os
import pickle
import numpy as np

UPLOAD_FOLDER = 'static/uploads/'
app = Flask(__name__, template_folder='templates')
app.secret_key = "super-secret-key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/draw')
def draw():
    return render_template('draw.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/uploader', methods = ['POST', 'GET'])
def uploader():
    if request.method == 'POST':
        uploadedfile = request.files.get('uploaded-file')

        filename = secure_filename(uploadedfile.filename)
        uploadedfile.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return render_template('upload.html', filename=filename)

@app.route('/display/<filename>')
def display_image(filename):
	return redirect(url_for('static', filename='uploads/' + filename), code=301)

@app.route('/predict')
def predict(filename):
    return
    

if __name__ == "__main__":
    app.run(debug=True)