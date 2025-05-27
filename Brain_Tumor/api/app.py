"""
Flask Backend for Brain Tumor Detection

This module implements the REST API endpoints for the brain tumor detection service.
It handles image upload, processing, and returns detection results with visualizations.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import io
import base64
import cv2
from werkzeug.utils import secure_filename
from model import BrainTumorModel

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff'}
MODEL_WEIGHTS_PATH = 'model_weights.h5'

# Create upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize model
model = BrainTumorModel(weights_path=MODEL_WEIGHTS_PATH if os.path.exists(MODEL_WEIGHTS_PATH) else None)

def allowed_file(filename):
    """
    Check if the uploaded file has an allowed extension.
    
    Args:
        filename (str): Name of the uploaded file
        
    Returns:
        bool: True if file extension is allowed, False otherwise
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_image(image_path):
    """
    Process the uploaded image for model input.
    
    Args:
        image_path (str): Path to the uploaded image
        
    Returns:
        numpy.ndarray: Processed image array
    """
    # Read image
    image = cv2.imread(image_path)
    
    # Convert BGR to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    return image

def encode_image(image):
    """
    Encode image array to base64 string.
    
    Args:
        image (numpy.ndarray): Image array
        
    Returns:
        str: Base64 encoded image string
    """
    # Convert to PIL Image
    if len(image.shape) == 2:
        image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
    elif image.shape[2] == 4:
        image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)
    
    pil_image = Image.fromarray(image)
    
    # Save to bytes
    img_byte_arr = io.BytesIO()
    pil_image.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    
    # Encode to base64
    return base64.b64encode(img_byte_arr).decode('utf-8')

@app.route('/api/detect', methods=['POST'])
def detect_tumor():
    """
    Endpoint for tumor detection in uploaded images.
    
    Returns:
        JSON: Detection results including prediction and visualization
    """
    # Check if a file was uploaded
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['image']
    
    # Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Check if the file extension is allowed
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400
    
    try:
        # Save the uploaded file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Process image
        image = process_image(file_path)
        
        # Get prediction and heatmap
        prediction, heatmap = model.predict(image)
        
        # Blend heatmap with original image
        alpha = 0.4
        overlay = cv2.addWeighted(
            image,
            1 - alpha,
            cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB),
            alpha,
            0
        )
        
        # Encode images to base64
        heatmap_base64 = encode_image(overlay)
        
        # Determine prediction class
        pred_class = "tumor" if prediction > 0.5 else "normal"
        
        # Return the results
        return jsonify({
            'prediction': pred_class,
            'confidence': float(prediction if pred_class == "tumor" else 1 - prediction),
            'heatmap': heatmap_base64
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    
    Returns:
        JSON: Service health status
    """
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)