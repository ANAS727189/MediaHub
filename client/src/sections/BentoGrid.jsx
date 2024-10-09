import React from 'react';
import { ToggleTheme } from "../context/UserContext";
import { 
  MonitorPlay, ThumbsUp, Lock, 
  Zap, Palette, Headphones,
  Users, Share2, BarChart3
} from 'lucide-react';

const BentoGridSection = () => {
  const { darkMode } = ToggleTheme();
  
  const features = [
    {
      title: "High Quality Streaming",
      description: "Experience crystal-clear HD and 4K video streaming with adaptive bitrate technology.",
      icon: <MonitorPlay className="h-6 w-6" />,
      size: "large"
    },
    {
      title: "User Friendly",
      description: "Intuitive interface designed for seamless navigation and effortless content management.",
      icon: <ThumbsUp className="h-6 w-6" />,
      size: "small"
    },
    {
      title: "Secure Uploads",
      description: "Enterprise-grade encryption ensures your content remains private and protected.",
      icon: <Lock className="h-6 w-6" />,
      size: "small"
    },
    {
      title: "Lightning Fast",
      description: "Advanced CDN integration for rapid video processing and instant playback.",
      icon: <Zap className="h-6 w-6" />,
      size: "small"
    },
    {
      title: "Fully Customizable",
      description: "Personalize player appearance, controls, and playback settings to match your brand.",
      icon: <Palette className="h-6 w-6" />,
      size: "small"
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive insights into viewer behavior and content performance.",
      icon: <BarChart3 className="h-6 w-6" />,
      size: "small"
    }
  ];

  return (
    <div className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-base font-semibold uppercase tracking-wide ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            Explore Our Features
          </h2>
          <p className={`mt-2 text-3xl font-extrabold ${
            darkMode ? 'text-white' : 'text-gray-900'
          } sm:text-4xl`}>
            Everything You Need to Succeed
          </p>
          <p className={`mt-4 max-w-2xl mx-auto text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Discover the tools and features that make VideoStream the perfect platform for creators and viewers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-750' 
                  : 'bg-white hover:bg-gray-50'
              } rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                feature.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="p-8">
                <div className={`inline-flex items-center justify-center p-3 rounded-lg ${
                  darkMode ? 'bg-blue-500' : 'bg-blue-600'
                } text-white`}>
                  {feature.icon}
                </div>
                <h3 className={`mt-6 text-xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`mt-4 text-base ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {feature.description}
                </p>
              </div>
              <div className={`px-8 py-4 bg-gradient-to-r ${
                darkMode 
                  ? 'from-gray-800 to-blue-900'
                  : 'from-blue-50 to-blue-100'
              }`}>
                <a 
                  href="#" 
                  className={`text-sm font-medium ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  } hover:underline`}
                >
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoGridSection;