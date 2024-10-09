import React, {useState} from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import { Menu } from 'lucide-react';
import { ToggleTheme } from '../../context/UserContext';

const Docs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode } = ToggleTheme();

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Mobile Header */}
      <div className={`md:hidden flex items-center justify-between p-4 border-b ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Documentation
        </h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-lg ${
            darkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Docs;