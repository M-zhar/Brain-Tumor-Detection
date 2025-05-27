import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ArrowLeft, Download, Printer, ExternalLink } from 'lucide-react';

interface ResultData {
  prediction: string;
  confidence: number;
  heatmap_url: string;
}

interface LocationState {
  result: ResultData;
  imageUrl: string;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    // If no result data, redirect to detection page
    if (!state?.result) {
      navigate('/detection');
    }
  }, [state, navigate]);

  if (!state?.result) {
    return null;
  }

  const { result, imageUrl } = state;
  const { prediction, confidence, heatmap_url } = result;
  
  const hasTumor = prediction === 'tumor';
  const confidencePercent = Math.round(confidence * 100);
  
  const getConfidenceColor = () => {
    if (confidencePercent >= 80) return 'text-success-500';
    if (confidencePercent >= 60) return 'text-warning-500';
    return 'text-gray-600';
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <button
        onClick={() => navigate('/detection')}
        className="flex items-center text-primary-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Detection
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className={`py-4 px-6 ${hasTumor ? 'bg-error-500' : 'bg-success-500'} text-white`}>
          <div className="flex items-center">
            {hasTumor ? (
              <AlertTriangle className="h-6 w-6 mr-3" />
            ) : (
              <CheckCircle className="h-6 w-6 mr-3" />
            )}
            <h1 className="text-2xl font-bold">
              {hasTumor ? 'Potential Tumor Detected' : 'No Tumor Detected'}
            </h1>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Original Scan</h2>
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img 
                  src={imageUrl} 
                  alt="Original MRI scan" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Heatmap</h2>
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img 
                  src={heatmap_url} 
                  alt="Analysis heatmap" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Detection Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Prediction</p>
                <p className={`text-xl font-bold ${hasTumor ? 'text-error-500' : 'text-success-500'}`}>
                  {hasTumor ? 'Potential Tumor' : 'No Tumor'}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Confidence</p>
                <p className={`text-xl font-bold ${getConfidenceColor()}`}>
                  {confidencePercent}%
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                <p className="text-lg font-medium text-gray-900">
                  {formatDate()}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Model Version</p>
                <p className="text-lg font-medium text-gray-900">
                  NeuraScan v1.0
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Interpretation</h3>
              <p className="text-gray-700 mb-4">
                {hasTumor
                  ? `The model has detected patterns consistent with the possible presence of a brain tumor with ${confidencePercent}% confidence. The heatmap highlights areas of concern that may require further examination.`
                  : `The model did not detect patterns consistent with the presence of a brain tumor with ${confidencePercent}% confidence. However, this does not completely rule out the possibility.`
                }
              </p>
              <div className="p-3 bg-primary-50 border border-primary-200 rounded-md text-primary-700">
                <p className="text-sm font-medium">
                  <strong>Important:</strong> This is an automated analysis and should not be used as a sole diagnostic tool. 
                  Please consult with a qualified healthcare professional for proper diagnosis and medical advice.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handlePrint}
                className="btn btn-outline flex items-center"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Results
              </button>
              <button className="btn btn-outline flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
              <button className="btn btn-primary flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Consult a Specialist
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {hasTumor && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <span className="text-primary-700 font-medium text-sm">1</span>
              </div>
              <p className="text-gray-700">Consult with a neurologist or neurosurgeon to discuss these findings.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <span className="text-primary-700 font-medium text-sm">2</span>
              </div>
              <p className="text-gray-700">Additional imaging studies may be needed to confirm the diagnosis.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <span className="text-primary-700 font-medium text-sm">3</span>
              </div>
              <p className="text-gray-700">A biopsy may be recommended to determine the tumor type and grade.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <span className="text-primary-700 font-medium text-sm">4</span>
              </div>
              <p className="text-gray-700">Early treatment planning can lead to better outcomes.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;