from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
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
        uploadedFile = request.files.get('uploaded-file')

        filename = secure_filename(uploadedFile.filename)
        uploadedFile.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return render_template('upload.html', filename=filename, predictDigit = predictDigit)

@app.route('/display/<filename>')
def displayImage(filename):
	return redirect(url_for('static', filename='uploads/' + filename), code=301)

@app.route('/predict', methods = ['POST', 'GET'])
def predictDigit(filename):
    img = Image.open(UPLOAD_FOLDER + filename).convert('L')
    resizedImage = img.resize((28, 28))
    pixelArray = np.array(resizedImage, dtype = 'float64')
    modelInput = pixelArray.reshape(1, -1)
    prediction = np.argmax(model.predict(modelInput))
    return render_template('upload.html', digit = str(prediction))
    


if __name__ == "__main__":
    app.run(debug=True)