import React from 'react';
import { Link } from 'react-router-dom';
import { ToggleTheme } from '../../context/UserContext';
import { BookOpen, Download, Code, Server, Users, HelpCircle, Menu, X, Settings, Zap } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { darkMode } = ToggleTheme();
  
  const navItems = [
    { id: 'introduction', label: 'Introduction', icon: BookOpen },
    { id: 'installation', label: 'Installation & Setup', icon: Download },
    { id: 'usage', label: 'API Documentation', icon: Code },
    { id: 'components', label: 'Architecture & Components', icon: Server },
    { id: 'contributing', label: 'Contributing & Development', icon: Users },
    { id: 'faq', label: 'FAQ & Troubleshooting', icon: HelpCircle },
  ];

  return (
    <div className={`fixed md:relative z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className={`w-64 h-screen overflow-y-auto border-r transition duration-300 ${
        darkMode 
          ? 'bg-gray-900 text-gray-200 border-gray-700' 
          : 'bg-white text-gray-800 border-gray-200'
      }`}>
        <div className="sticky top-0 z-10 p-4 bg-opacity-90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">MediaHub Docs</h2>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Comprehensive Guide</p>
            </div>
            <button onClick={toggleSidebar} className="md:hidden p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    to={`#${item.id}`}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition duration-150 ${
                      darkMode
                        ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;