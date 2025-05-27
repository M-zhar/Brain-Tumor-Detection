import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';

interface UploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
  error: string | null;
}

const DetectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    preview: null,
    uploading: false,
    error: null,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please upload an image file (JPEG, PNG, etc.)'
      }));
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadState(prev => ({
        ...prev,
        error: 'File size exceeds 5MB limit'
      }));
      return;
    }
    
    const preview = URL.createObjectURL(file);
    setUploadState({
      file,
      preview,
      uploading: false,
      error: null,
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff', '.dcm'],
    },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (!uploadState.file) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please upload an image first'
      }));
      return;
    }

    setUploadState(prev => ({ ...prev, uploading: true, error: null }));

    // Create form data
    const formData = new FormData();
    formData.append('image', uploadState.file);

    try {
      // This would be the actual API call to your Flask backend
      // For demo purposes, we'll simulate a response after a delay
      
      // const response = await axios.post('/api/detect', formData);
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a successful response
      const simulatedResponse = {
        data: {
          prediction: 'tumor',
          confidence: 0.89,
          heatmap_url: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        }
      };
      
      // Navigate to results page with the prediction data
      navigate('/results', { 
        state: { 
          result: simulatedResponse.data,
          imageUrl: uploadState.preview
        } 
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        error: 'Error processing image. Please try again.'
      }));
    }
  };

  const handleReset = () => {
    if (uploadState.preview) {
      URL.revokeObjectURL(uploadState.preview);
    }
    setUploadState({
      file: null,
      preview: null,
      uploading: false,
      error: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Brain Tumor Detection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a brain MRI scan image to detect the presence of tumors. Our AI model
          will analyze the image and provide results with confidence scores.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload MRI Scan</h2>
        
        {!uploadState.preview ? (
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop the file here' : 'Drag & drop your MRI scan here'}
            </p>
            <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
            <p className="text-xs text-gray-400">
              Supports: JPEG, PNG, DICOM, and other common image formats (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/2">
              <div className="relative rounded-lg overflow-hidden aspect-square bg-gray-100">
                <img 
                  src={uploadState.preview} 
                  alt="Uploaded MRI scan" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Image Preview</h3>
              <p className="text-sm text-gray-600 mb-2">
                Filename: {uploadState.file?.name}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Size: {(uploadState.file?.size || 0) / 1024 < 1000 
                  ? `${Math.round((uploadState.file?.size || 0) / 1024 * 10) / 10} KB` 
                  : `${Math.round((uploadState.file?.size || 0) / 1024 / 1024 * 10) / 10} MB`}
              </p>
              <div className="mt-auto flex space-x-4">
                <button
                  onClick={handleReset}
                  className="btn btn-outline flex-1"
                  disabled={uploadState.uploading}
                >
                  Change Image
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary flex-1"
                  disabled={uploadState.uploading}
                >
                  {uploadState.uploading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Processing...
                    </>
                  ) : 'Analyze Image'}
                </button>
              </div>
            </div>
          </div>
        )}

        {uploadState.error && (
          <div className="mt-4 p-3 bg-error-500/10 border border-error-500/30 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-error-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error-500">{uploadState.error}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips for Better Results</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 flex-shrink-0">1</span>
            <span>Use clear, high-resolution MRI scans without additional markings or annotations</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 flex-shrink-0">2</span>
            <span>Ensure the scan is properly oriented and centered on the brain</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 flex-shrink-0">3</span>
            <span>For best results, use T1-weighted or T2-weighted MRI images</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 flex-shrink-0">4</span>
            <span>Remove any personal identifying information from the image</span>
          </li>
        </ul>
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm text-gray-500 italic">
            <strong>Note:</strong> This tool is for educational and research purposes only. 
            It should not be used as a substitute for professional medical diagnosis.
            Always consult with a qualified healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;