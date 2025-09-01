import React from 'react';
import { Users, Play, Shield, Zap } from 'lucide-react';
import { ToggleTheme } from '../context/UserContext';

const StatsSection = () => {
  const { darkMode } = ToggleTheme();

  const stats = [
    { icon: <Users className="w-8 h-8" />, stat: "500K+", label: "Active Users" },
    { icon: <Play className="w-8 h-8" />, stat: "1M+", label: "Videos Uploaded" },
    { icon: <Zap className="w-8 h-8" />, stat: "100K+", label: "Content Creators" },
    { icon: <Shield className="w-8 h-8" />, stat: "250+", label: "Countries Served" },
  ];

  return (
    <div className={`py-24 transition-colors duration-200 ${
      darkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Global Impact
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Empowering creators and viewers worldwide
          </p>
        </div>
        
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={index} className={`px-6 py-8 rounded-lg ${
              darkMode 
                ? 'bg-gray-900 border border-gray-700' 
                : 'bg-white shadow-lg'
            } transition-all duration-300 hover:transform hover:scale-105`}>
              <div className={`flex items-center justify-center h-12 w-12 rounded-md ${
                darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'
              } mx-auto`}>
                {item.icon}
              </div>
              <dt className={`mt-6 text-4xl font-extrabold text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {item.stat}
              </dt>
              <dd className={`mt-2 text-lg font-medium text-center ${
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