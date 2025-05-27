import React from 'react';
import { Brain, Award, BookOpen, FileText } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About NeuraScan</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn more about our brain tumor detection platform, how it works, and the technology behind it.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="h-6 w-6 text-primary-500 mr-2" />
          Our Mission
        </h2>
        <p className="text-gray-700 mb-4">
          NeuraScan aims to make advanced medical imaging analysis more accessible through the power of 
          artificial intelligence. Our mission is to provide tools that can assist healthcare professionals 
          in the early detection and diagnosis of brain tumors, potentially leading to better patient outcomes.
        </p>
        <p className="text-gray-700">
          While our platform is not intended to replace professional medical diagnosis, it can serve as a 
          valuable preliminary assessment tool and educational resource for understanding brain tumor detection.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-6 w-6 text-primary-500 mr-2" />
          How It Works
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Deep Learning Model</h3>
            <p className="text-gray-700">
              Our platform utilizes a convolutional neural network (CNN) trained on thousands of MRI scans 
              to detect patterns associated with brain tumors. The model has been fine-tuned to recognize 
              various types of brain tumors with high sensitivity and specificity.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Image Processing</h3>
            <p className="text-gray-700">
              When you upload an MRI scan, our system preprocesses the image to standardize the format,
              normalize the brightness and contrast, and prepare it for analysis by the neural network.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Tumor Detection</h3>
            <p className="text-gray-700">
              The preprocessed image is analyzed by our AI model, which identifies regions of interest 
              that may indicate the presence of a tumor. The system generates a probability score indicating 
              the likelihood of a tumor being present.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Visualization</h3>
            <p className="text-gray-700">
              Results are presented with a heatmap overlay that highlights areas of concern, making it 
              easier to interpret the model's findings. This visual representation helps in understanding 
              which regions the AI is focusing on for its prediction.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="h-6 w-6 text-primary-500 mr-2" />
          Our Technology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Model Architecture</h3>
            <p className="text-gray-700">
              We use a custom-designed convolutional neural network based on modern architectures 
              like ResNet and U-Net, optimized specifically for medical imaging analysis.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Training Data</h3>
            <p className="text-gray-700">
              Our model was trained on a diverse dataset of thousands of anonymized MRI scans, 
              including both healthy brains and those with various types of tumors.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Metrics</h3>
            <p className="text-gray-700">
              The current version of our model achieves approximately 90% accuracy, with a sensitivity 
              of 88% and specificity of 92% on our test dataset.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Continuous Improvement</h3>
            <p className="text-gray-700">
              We are constantly working to improve our model through ongoing research, 
              additional training data, and refinements to our algorithms.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="h-6 w-6 text-primary-500 mr-2" />
          Important Disclaimer
        </h2>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
          <p className="text-gray-700">
            <strong>NeuraScan is intended for educational and research purposes only.</strong> It is not a 
            substitute for professional medical advice, diagnosis, or treatment. Always seek the advice 
            of a qualified healthcare provider with any questions you may have regarding a medical condition.
          </p>
        </div>
        <p className="text-gray-700">
          The results provided by our platform should be considered as a preliminary assessment tool only. 
          Proper diagnosis of brain tumors requires clinical evaluation by medical professionals, typically 
          including multiple imaging studies, and often a biopsy for definitive diagnosis.
        </p>
        <p className="text-gray-700 mt-4">
          While we strive for high accuracy, our AI model has limitations and may not detect all tumors or 
          may incorrectly identify normal structures as tumors in some cases. Therefore, results should 
          always be verified by healthcare professionals.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;