import React from 'react';
import { ToggleTheme } from "../context/UserContext";
import { 
  MonitorPlay, ThumbsUp, Lock, 
  Zap, Palette, Headphones,
  Users, Share2, BarChart3, ArrowRight
} from 'lucide-react';

const BentoGridSection = () => {
  const { darkMode } = ToggleTheme();
  
  const features = [
    {
      title: "High Quality Streaming",
      description: "Experience crystal-clear HD and 4K video streaming with adaptive bitrate technology that ensures perfect playback quality regardless of your connection speed.",
      icon: <MonitorPlay className="w-8 h-8" />,
      size: "large",
      gradient: "from-purple-500 to-blue-500",
      position: "col-span-1 md:col-span-2 lg:col-span-2"
    },
    {
      title: "User Friendly",
      description: "Intuitive interface designed for seamless navigation and effortless content management across all devices.",
      icon: <ThumbsUp className="w-8 h-8" />,
      size: "medium",
      gradient: "from-green-500 to-emerald-500",
      position: "col-span-1"
    },
    {
      title: "Secure Uploads",
      description: "Enterprise-grade encryption ensures your content remains private and protected with advanced security protocols.",
      icon: <Lock className="w-8 h-8" />,
      size: "medium",
      gradient: "from-red-500 to-rose-500",
      position: "col-span-1"
    },
    {
      title: "Lightning Fast",
      description: "Advanced CDN integration for rapid video processing and instant playback worldwide with minimal latency.",
      icon: <Zap className="w-8 h-8" />,
      size: "medium",
      gradient: "from-yellow-500 to-orange-500",
      position: "col-span-1"
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive insights into viewer behavior, engagement patterns, and content performance metrics with real-time data visualization and detailed reporting.",
      icon: <BarChart3 className="w-8 h-8" />,
      size: "large",
      gradient: "from-blue-500 to-cyan-500",
      position: "col-span-1 md:col-span-2 lg:col-span-2"
    },
    {
      title: "Fully Customizable",
      description: "Personalize player appearance, controls, and playback settings to match your brand perfectly with extensive theming options.",
      icon: <Palette className="w-8 h-8" />,
      size: "medium",
      gradient: "from-indigo-500 to-purple-500",
      position: "col-span-1"
    }
  ];

  return (
    <div className={`py-24 transition-colors duration-200 ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center lg:mb-20">
          <p className={`text-base font-semibold uppercase tracking-wide ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            Explore Our Features
          </p>
          <h2 className={`mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Everything You Need to
            <span className={`block ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Succeed
            </span>
          </h2>
          <p className={`mt-4 max-w-3xl mx-auto text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Discover the powerful tools and features that make MediaHub the perfect platform for creators and viewers alike
          </p>
        </div>

        {/* Professional Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${
                feature.position
              } ${
                feature.size === 'large' 
                  ? 'min-h-[400px] lg:min-h-[450px] xl:min-h-[380px]' 
                  : 'min-h-[320px] lg:min-h-[350px] xl:min-h-[320px]'
              } ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 transition-opacity duration-500 z-0`} />
              
              {/* Content Container */}
              <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8">
                {/* Top Section - Icon and Title */}
                <div className="flex-shrink-0">
                  <div className={`inline-flex items-center justify-center p-3 lg:p-4 rounded-xl shadow-lg bg-gradient-to-br ${feature.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className={`mt-4 lg:mt-6 text-lg lg:text-xl xl:text-2xl font-bold leading-tight ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                </div>

                {/* Middle Section - Description */}
                <div className="flex-grow mt-3 lg:mt-4">
                  <p className={`text-sm lg:text-base leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  } ${feature.size === 'large' ? 'lg:text-lg' : ''}`}>
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Section - Learn More Link */}
                <div className="flex-shrink-0 mt-4 lg:mt-6">
                  <div className={`inline-flex items-center text-sm font-semibold cursor-pointer ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  } transition-colors duration-300`}>
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Decorative Elements for Large Cards */}
                {feature.size === 'large' && (
                  <>
                    <div className={`absolute -top-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl`} />
                    <div className={`absolute -bottom-4 -left-4 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-tr ${feature.gradient} opacity-5 rounded-full blur-xl`} />
                  </>
                )}
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient} opacity-10 z-0`} />
            </div>
          ))}
        </div>
      
      </div>
    </div>
  );
};

export default BentoGridSection;