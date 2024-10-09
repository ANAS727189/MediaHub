import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-sm">&copy; 2024 VideoStream. All Rights Reserved.</p>
        </div>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">Contact Us</a>
        </div>
        <div className="mt-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">Facebook</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">Twitter</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">LinkedIn</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
