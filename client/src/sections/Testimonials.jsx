import React from 'react';
import { ToggleTheme } from "../context/UserContext";
import { User as UserIcon } from "lucide-react"; // Import the User icon from Lucide

const TestimonialsSection = () => {
  const { darkMode } = ToggleTheme(); // Use context for dark mode
  const testimonials = [
    {
      name: "John Doe",
      role: "Content Creator",
      photo: "", // Intentionally left empty for demonstration
      quote: "VideoStream has transformed the way I share my content. The platform is reliable and the support team is always there to help!",
    },
    {
      name: "Jane Smith",
      role: "Marketing Manager",
      photo: "",
      quote: "The analytics tools provided by VideoStream are top-notch. They have helped us understand our audience better and tailor our content accordingly.",
    },
    {
      name: "Alice Johnson",
      role: "Educator",
      photo: "", // Intentionally left empty for demonstration
      quote: "Using VideoStream for my online courses has been a game-changer. The video quality is excellent and the user interface is very intuitive.",
    },
  ];

  return (
    <div className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center`}>
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-12`}>
          What Our Users Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`max-w-md p-6 rounded-lg shadow-lg transition-shadow duration-200 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} hover:shadow-2xl`}>
              <div className="flex items-center justify-center mb-4">
                {testimonial.photo ? (
                  <img src={testimonial.photo} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-blue-500 bg-gray-300">
                    <UserIcon className="h-8 w-8 text-gray-500" />
                  </div>
                )}
              </div>
              <p className={`italic mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{testimonial.quote}"</p>
              <p className={`font-semibold`}>{testimonial.name}</p>
              <p className={`text-gray-500 text-sm`}>{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
