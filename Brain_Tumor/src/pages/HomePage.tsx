import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Upload, FileCheck, AlertCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Upload className="h-10 w-10 text-primary-500" />,
      title: 'Easy Upload',
      description: 'Simply upload your MRI scan image and let our system do the work.',
    },
    {
      icon: <Brain className="h-10 w-10 text-primary-500" />,
      title: 'Advanced AI',
      description: 'Our model uses deep learning techniques to detect brain tumors with high accuracy.',
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary-500" />,
      title: 'Quick Results',
      description: 'Get detection results within seconds, no waiting required.',
    },
    {
      icon: <AlertCircle className="h-10 w-10 text-primary-500" />,
      title: 'Educational',
      description: 'Learn about different types of brain tumors and the detection process.',
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="animate-slideUp">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Advanced Brain Tumor Detection
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Our AI-powered platform helps detect brain tumors from MRI scans with high accuracy, 
                providing a valuable preliminary assessment tool.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => navigate('/detection')}
                  className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold text-base"
                >
                  Start Detection
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold text-base"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Brain MRI scan" 
                className="rounded-lg shadow-lg w-full object-cover max-h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines advanced machine learning with a user-friendly interface
              to provide quick and accurate brain tumor detection from MRI scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card hover:shadow-lg border border-gray-100 p-6 text-center"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-50 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Try It Yourself?</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Upload your MRI scan and get results in seconds. Our platform is designed
            to be easy to use while providing valuable insights.
          </p>
          <button 
            onClick={() => navigate('/detection')}
            className="btn bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-md font-semibold text-lg"
          >
            Start Detection Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;