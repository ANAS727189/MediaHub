import React from 'react';
import { ToggleTheme } from "../context/UserContext";
import { User, Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const { darkMode } = ToggleTheme();
  
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Digital Content Creator",
      company: "@AlexCreates",
      photo: "",
      quote: "MediaHub's image editing tools are incredibly powerful. The AI upscaling and format conversion features have streamlined my workflow significantly. Perfect for content creators!",
      rating: 5,
      verified: true
    },
    {
      name: "Maria Rodriguez",
      role: "Web Developer",
      company: "DevStudio Pro",
      photo: "",
      quote: "The video processing capabilities are impressive. HLS streaming works flawlessly and the batch processing saves me hours. The Cloudinary integration is a game-changer.",
      rating: 5,
      verified: true
    },
    {
      name: "James Wilson",
      role: "Photographer",
      company: "Wilson Photography",
      photo: "",
      quote: "Finally, a platform that handles both images and videos professionally. The compression algorithms are excellent - maintaining quality while reducing file sizes dramatically.",
      rating: 5,
      verified: true
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : darkMode ? 'text-gray-600' : 'text-gray-300'
        }`} 
      />
    ));
  };

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
            Testimonials
          </p>
          <h2 className={`mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            What Our 
            <span className={`block ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Users Say
            </span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Hear from developers, creators, and professionals who trust MediaHub for their media processing needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`group relative p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700 hover:border-blue-500' 
                  : 'bg-white border border-gray-100 hover:border-blue-300'
              }`}
            >
              {/* Quote Icon */}
              <div className={`absolute top-6 right-6 ${
                darkMode ? 'text-blue-500' : 'text-blue-600'
              } opacity-20`}>
                <Quote className="w-8 h-8" />
              </div>

              {/* Profile Section */}
              <div className="flex items-center mb-6">
                {testimonial.photo ? (
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name} 
                    className="object-cover w-16 h-16 border-blue-500 rounded-full shadow-lg border-3" 
                  />
                ) : (
                  <div className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg ${
                    darkMode 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-blue-600 to-blue-700'
                  } text-white`}>
                    <User className="w-8 h-8" />
                  </div>
                )}
                <div className="flex-1 ml-4">
                  <h4 className={`text-lg font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  } font-medium`}>
                    {testimonial.role}
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
                {testimonial.verified && (
                  <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                    darkMode 
                      ? 'bg-green-900 text-green-400' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    Verified
                  </span>
                )}
              </div>

              {/* Quote */}
              <blockquote className={`text-base leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              } mb-4`}>
                "{testimonial.quote}"
              </blockquote>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10' 
                  : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;