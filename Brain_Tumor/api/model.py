"""
Brain Tumor Detection Model
This module implements a CNN model for brain tumor detection using TensorFlow.
The model is trained on MRI scan images and can detect the presence of tumors.
"""

import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import cv2
from tensorflow.keras.applications import VGG16
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
from grad_cam import GradCAM

class BrainTumorModel:
    def __init__(self, weights_path=None):
        """
        Initialize the brain tumor detection model.
        
        Args:
            weights_path (str, optional): Path to pre-trained weights
        """
        self.model = self._build_model()
        if weights_path:
            self.model.load_weights(weights_path)
        
        # Initialize Grad-CAM
        self.grad_cam = GradCAM(self.model, self.model.layers[-3])

    def _build_model(self):
        """
        Build and compile the CNN model architecture.
        
        Returns:
            tf.keras.Model: Compiled model
        """
        # Use VGG16 as base model
        base_model = VGG16(
            weights='imagenet',
            include_top=False,
            input_shape=(224, 224, 3)
        )
        
        # Freeze base model layers
        for layer in base_model.layers:
            layer.trainable = False
        
        # Add custom layers
        model = models.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dense(512, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(256, activation='relu'),
            layers.Dropout(0.3),
            layers.Dense(1, activation='sigmoid')
        ])
        
        # Compile model
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy', tf.keras.metrics.AUC()]
        )
        
        return model

    def train(self, train_data_dir, validation_data_dir, epochs=20):
        """
        Train the model on the provided dataset.
        
        Args:
            train_data_dir (str): Directory containing training data
            validation_data_dir (str): Directory containing validation data
            epochs (int): Number of training epochs
        """
        # Data augmentation for training
        train_datagen = ImageDataGenerator(
            rescale=1./255,
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            horizontal_flip=True,
            fill_mode='nearest'
        )
        
        # Only rescaling for validation
        valid_datagen = ImageDataGenerator(rescale=1./255)
        
        # Create data generators
        train_generator = train_datagen.flow_from_directory(
            train_data_dir,
            target_size=(224, 224),
            batch_size=32,
            class_mode='binary'
        )
        
        validation_generator = valid_datagen.flow_from_directory(
            validation_data_dir,
            target_size=(224, 224),
            batch_size=32,
            class_mode='binary'
        )
        
        # Train the model
        history = self.model.fit(
            train_generator,
            validation_data=validation_generator,
            epochs=epochs,
            callbacks=[
                tf.keras.callbacks.EarlyStopping(
                    monitor='val_loss',
                    patience=3,
                    restore_best_weights=True
                )
            ]
        )
        
        return history

    def predict(self, image):
        """
        Make prediction on a single image.
        
        Args:
            image (numpy.ndarray): Input image array
            
        Returns:
            tuple: (prediction probability, heatmap)
        """
        # Preprocess image
        processed_img = self._preprocess_image(image)
        
        # Make prediction
        prediction = self.model.predict(processed_img)[0][0]
        
        # Generate heatmap using Grad-CAM
        heatmap = self._generate_heatmap(processed_img)
        
        return prediction, heatmap

    def _preprocess_image(self, image):
        """
        Preprocess image for model input.
        
        Args:
            image (numpy.ndarray): Input image
            
        Returns:
            numpy.ndarray: Preprocessed image
        """
        # Resize to model input size
        image = cv2.resize(image, (224, 224))
        
        # Ensure 3 channels
        if len(image.shape) == 2:
            image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
        
        # Normalize pixel values
        image = image.astype('float32') / 255.0
        
        # Add batch dimension
        image = np.expand_dims(image, axis=0)
        
        return image

    def _generate_heatmap(self, preprocessed_img):
        """
        Generate heatmap using Grad-CAM.
        
        Args:
            preprocessed_img (numpy.ndarray): Preprocessed input image
            
        Returns:
            numpy.ndarray: Heatmap overlay
        """
        # Generate raw heatmap
        heatmap = self.grad_cam.compute_heatmap(preprocessed_img)
        
        # Normalize heatmap
        heatmap = np.maximum(heatmap, 0)
        heatmap = heatmap / np.max(heatmap)
        
        # Resize to original size
        heatmap = cv2.resize(heatmap, (224, 224))
        
        # Apply colormap
        heatmap = np.uint8(255 * heatmap)
        heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
        
        return heatmap

    def save_weights(self, path):
        """
        Save model weights to file.
        
        Args:
            path (str): Path to save weights
        """
        self.model.save_weights(path)

    def load_weights(self, path):
        """
        Load model weights from file.
        
        Args:
            path (str): Path to weights file
        """
        self.model.load_weights(path)