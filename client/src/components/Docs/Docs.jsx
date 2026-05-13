import React, {useState} from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import { Menu } from 'lucide-react';
import { ToggleTheme } from '../../context/UserContext';

const Docs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode } = ToggleTheme();

  return (
    <div className={`relative min-h-screen flex flex-col overflow-hidden ${darkMode ? 'bg-[#0B0D14] text-gray-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'}`} />
        <div className={`absolute bottom-0 left-0 h-80 w-80 rounded-full blur-3xl ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-200/30'}`} />
      </div>

      {/* Mobile Header */}
      <div className={`relative z-10 flex items-center justify-between border-b px-4 py-4 md:hidden ${
        darkMode ? 'bg-[#0B0D14]/95 border-gray-800' : 'bg-white/95 border-gray-200'
      }`}>
        <h1 className="text-xl font-bold tracking-tight text-blue-500">
          Documentation
        </h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`rounded-lg p-2 ${
            darkMode ? 'text-gray-200 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="relative z-10 flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-slate-950/60 backdrop-blur-[2px] md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <div className="relative flex-1">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Docs;