import React from 'react';
import {LinkedinIcon, GithubIcon, TwitterIcon} from "lucide-react"

const Footer = () => {
  return (
    <footer className="py-8 text-white bg-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <p className="text-sm">&copy; 2025 MediaHub. All Rights Reserved.</p>
        </div>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 transition duration-150 hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="text-gray-400 transition duration-150 hover:text-gray-300">Terms of Service</a>
          <a href="#" className="text-gray-400 transition duration-150 hover:text-gray-300">Contact Us</a>
        </div>
        <div className="mt-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="https://www.github.com/in/ANAS727189/" className="text-gray-400 transition duration-150 hover:text-gray-300"><GithubIcon /></a>
            </li>
            <li>
              <a href="https://x.com/Anas_is_me" className="text-gray-400 transition duration-150 hover:text-gray-300"><TwitterIcon /></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/anas-khan83/" className="text-gray-400 transition duration-150 hover:text-gray-300"><LinkedinIcon /></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
