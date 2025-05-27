import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} NeuraScan. All rights reserved.
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 mr-2">Created with</p>
            <Heart className="h-4 w-4 text-error-500" />
            <p className="text-sm text-gray-600 ml-2">for better healthcare</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-600">
              This tool is for educational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;