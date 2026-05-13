import React from 'react';
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }

    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <div className={`fixed z-30 transform transition-transform duration-300 ease-in-out md:sticky md:top-24 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className={`h-full w-72 border-r backdrop-blur-xl transition duration-300 ${
        darkMode 
          ? 'border-gray-800/90 bg-[#0B0D14]/95 text-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.35)]' 
          : 'border-gray-200 bg-white/95 text-gray-800 shadow-[0_20px_60px_rgba(15,23,42,0.08)]'
      }`}>
        <div className={`sticky top-0 z-10 border-b p-4 ${darkMode ? 'border-gray-800 bg-[#0B0D14]/90' : 'border-gray-200 bg-white/90'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-blue-500">MediaHub Docs</h2>
              <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Comprehensive Guide</p>
            </div>
            <button onClick={toggleSidebar} className={`rounded-lg p-2 md:hidden ${darkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'}`}>
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
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`flex w-full items-center space-x-3 rounded-xl border px-3 py-3 text-left transition duration-150 ${
                      darkMode
                        ? 'border-transparent text-gray-300 hover:border-gray-700 hover:bg-white/5 hover:text-white'
                        : 'border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium leading-snug">{item.label}</span>
                  </button>
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