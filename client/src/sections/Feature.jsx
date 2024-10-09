import React from 'react';
import { ToggleTheme } from '../context/UserContext';
import { Zap, Shield, BarChart, Users, Video, Settings } from 'lucide-react';

const FeatureSection = () => {
  const { darkMode } = ToggleTheme();

  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "High-Quality Streaming",
      description: "Enjoy 4K video quality with adaptive streaming technology for seamless playback on any device or connection."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Advanced Security",
      description: "Your content is protected with end-to-end encryption and customizable privacy settings for complete control."
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Detailed Analytics",
      description: "Track your video performance with comprehensive analytics, including viewer demographics and engagement metrics."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Uploads",
      description: "Upload videos quickly with our optimized content delivery network, ensuring rapid processing and distribution."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Features",
      description: "Build your audience with interactive comments, likes, and sharing capabilities to grow your viewer base."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Customization Tools",
      description: "Personalize your video player, thumbnails, and channel appearance to match your brand identity."
    }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-24 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-base font-semibold uppercase tracking-wide ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            Features
          </h2>
          <p className={`mt-2 text-3xl font-extrabold ${
            darkMode ? 'text-white' : 'text-gray-900'
          } sm:text-4xl`}>
            Why Choose VideoStream?
          </p>
          <p className={`mt-4 max-w-2xl mx-auto text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Everything you need to create, share, and grow your video content
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`relative p-6 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-750' 
                  : 'bg-white hover:bg-gray-50'
              } rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1`}
            >
              <div className={`h-12 w-12 rounded-md flex items-center justify-center ${
                darkMode ? 'bg-blue-500' : 'bg-blue-600'
              } text-white`}>
                {feature.icon}
              </div>
              <h3 className={`mt-4 text-lg font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`mt-2 text-base ${
                darkMode ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className={`relative rounded-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-xl overflow-hidden`}>
            <div className="absolute inset-0">
              <img 
                className="h-full w-full object-cover opacity-30"
                src="/api/placeholder/1200/400" 
                alt="Video streaming platform interface"
              />
              <div className={`absolute inset-0 ${
                darkMode 
                  ? 'bg-gradient-to-r from-gray-800 to-blue-900' 
                  : 'bg-gradient-to-r from-blue-100 to-blue-200'
              } mix-blend-multiply`} />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h2 className={`text-center text-4xl font-extrabold ${
                darkMode ? 'text-white' : 'text-gray-900'
              } tracking-tight sm:text-5xl lg:text-6xl`}>
                Take your content to the next level
              </h2>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-gray-300 sm:max-w-3xl">
                Join thousands of content creators who trust VideoStream for their streaming needs
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <a href="#" className={`flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${
                    darkMode 
                      ? 'text-gray-900 bg-white hover:bg-gray-100' 
                      : 'text-white bg-blue-600 hover:bg-blue-700'
                  } transition duration-150`}>
                    Get Started
                  </a>
                  <a href="#" className={`flex items-center justify-center px-4 py-3 border text-base font-medium rounded-md shadow-sm ${
                    darkMode 
                      ? 'border-gray-300 text-white bg-transparent hover:bg-gray-700' 
                      : 'border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50'
                  } transition duration-150`}>
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;