import React from 'react';
import { Users, Play, Shield, Zap } from 'lucide-react';
import { ToggleTheme } from '../context/UserContext';

const StatsSection = () => {
  const { darkMode } = ToggleTheme();

  const stats = [
    { icon: <Users className="w-8 h-8" />, stat: "15+", label: "Editing Tools" },
    { icon: <Play className="w-8 h-8" />, stat: "Multiple", label: "Format Support" },
    { icon: <Zap className="w-8 h-8" />, stat: "AI", label: "Powered Features" },
    { icon: <Shield className="w-8 h-8" />, stat: "Cloud", label: "Based Processing" },
  ];

  return (
    <div className={`py-16 sm:py-20 lg:py-24 transition-colors duration-200 ${
      darkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Comprehensive Media Tools
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Professional-grade capabilities for all your media processing needs
          </p>
        </div>
        
        <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((item, index) => (
            <div key={index} className={`px-4 py-6 sm:px-6 sm:py-8 rounded-lg ${
              darkMode 
                ? 'bg-gray-900 border border-gray-700' 
                : 'bg-white shadow-lg'
            } transition-all duration-300 hover:transform hover:scale-105`}>
              <div className={`flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md ${
                darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'
              } mx-auto`}>
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                  {item.icon}
                </div>
              </div>
              <dt className={`mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {item.stat}
              </dt>
              <dd className={`mt-2 text-sm sm:text-base lg:text-lg font-medium text-center ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default StatsSection;