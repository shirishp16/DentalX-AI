import os
import io
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image, ImageDraw

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")
CORS(app)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    full_path = os.path.join(app.static_folder, path)
    if path and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

# Load model at startup
path = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.abspath(os.path.join(path, '..', 'model', 'best_model.keras'))
print("Loading model from:", model_path)
model = load_model(model_path)

# Define class names (update as needed)
class_names = ['Implant', 'Filling', 'Cavity', 'Impacted Tooth']


def preprocess_image(file):
    # Open image
    img = Image.open(file).convert('RGB')
    # Resize
    img = img.resize((256, 512))
    # Normalize
    img_arr = np.array(img).astype('float32') * (1.0/255.0)
    # Expand dims
    img_arr = np.expand_dims(img_arr, axis=0)  # (1, 256, 512, 3)
    return img_arr

@app.route('/predict', methods=['POST','OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return '', 200
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request.'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file.'}), 400
    try:
        img_arr = preprocess_image(file)
        preds = model.predict(img_arr)
        top_idx = int(np.argmax(preds[0]))
        prediction = class_names[top_idx] if top_idx < len(class_names) else str(top_idx)
        confidence = float(np.max(preds[0]))
        return jsonify({'prediction': prediction, 'confidence': confidence})
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500
    
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'OPTIONS,POST'
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5001)