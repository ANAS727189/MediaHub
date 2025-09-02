import React from 'react';
import { ToggleTheme } from '../context/UserContext';
import { Zap, Shield, BarChart, Users, Video, Settings } from 'lucide-react';

const FeatureSection = () => {
  const { darkMode } = ToggleTheme();

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Advanced Video Processing",
      description: "Professional video editing with HLS streaming, trimming, speed control, audio manipulation, and real-time thumbnail generation using FFmpeg technology."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Image Transformation Suite",
      description: "Complete image editing toolkit including resize, crop, compress, rotate, effects, watermarking, and AI-powered upscaling for professional results."
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Format Conversion Hub",
      description: "Convert between multiple formats - JPG to PNG, WebP optimization, video format conversion, and image-to-PDF generation with optimized compression."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cloud-Powered Processing",
      description: "Harness Cloudinary's powerful APIs for lightning-fast media transformations with global CDN delivery and enterprise-grade reliability."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User-Friendly Interface",
      description: "Intuitive drag-and-drop interface with real-time preview, batch processing capabilities, and seamless workflow management for all skill levels."
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Professional Features",
      description: "Advanced tools including batch processing, custom watermarks, quality optimization, secure file handling, and comprehensive export options."
    }
  ];

  return (
    <div className={`py-24 transition-colors duration-200 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className={`text-base font-semibold uppercase tracking-wide ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            Features
          </p>
          <h2 className={`mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Why Choose 
            <span className={`block ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              MediaHub?
            </span>
          </h2>
          <p className={`mt-4 max-w-3xl mx-auto text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Professional media processing tools powered by cutting-edge technology and cloud infrastructure
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {/* Icon Container */}
              <div className={`inline-flex items-center justify-center p-4 rounded-xl shadow-lg ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                  : 'bg-gradient-to-br from-blue-600 to-blue-700'
              } text-white group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className={`mt-6 text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`mt-4 text-base leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20' 
                  : 'bg-gradient-to-br from-blue-100/50 to-indigo-100/50'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;