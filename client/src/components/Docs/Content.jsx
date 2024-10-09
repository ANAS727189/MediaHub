import React from 'react';
import { ToggleTheme } from "../../context/UserContext";
import { BookOpen, Download, Code, Server, Users, HelpCircle } from 'lucide-react';

const Content = () => {
  const { darkMode } = ToggleTheme();

  const Section = ({ id, title, icon: Icon, children }) => (
    <section id={id} className="mb-16 scroll-mt-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );

  const CodeBlock = ({ children }) => (
    <pre className={`p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto ${
      darkMode ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <code>{children}</code>
    </pre>
  );

  return (
    <div className={`h-full transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
    }`}>
      <div className=" mx-auto p-8">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Video Streaming Platform
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A comprehensive solution for seamless video streaming and user engagement
          </p>
        </div>

        <Section id="introduction" title="Introduction" icon={BookOpen}>
          <p className="mb-6 leading-relaxed">
            This project is a comprehensive web application designed for seamless video streaming and user engagement. Built using the latest JavaScript frameworks and libraries such as React and React Router, it provides a robust foundation for developing interactive and dynamic user interfaces.
          </p>
          <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
            <p className="text-sm">
              The application features user authentication, a rich media player, and a responsive design that adapts to various devices. It aims to offer an engaging experience for users, making video streaming accessible and enjoyable.
            </p>
          </div>
        </Section>

      <Section id="installation" title="Installation" icon={Download}>
        <p className="mb-4">
          To get started, clone the repository and install the necessary dependencies:
        </p>
        <CodeBlock>
          git clone https://github.com/username/projectname.git
          cd projectname
          npm install
        </CodeBlock>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Ensure you have Node.js and npm installed on your machine. If not, download and install them from the <a href="https://nodejs.org/" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>official Node.js website</a>.
        </p>
      </Section>

      <Section id="usage" title="Usage" icon={Code}>
        <p className="mb-4">To run the project locally:</p>
        <CodeBlock>npm start</CodeBlock>
        
        <p className="mb-4">For production builds:</p>
        <CodeBlock>npm run build</CodeBlock>
      </Section>

      <Section id="components" title="Components" icon={Server}>
        <p className="mb-4">Key components include:</p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            { name: 'Navbar', desc: 'Responsive navigation bar with section links' },
            { name: 'HomePage', desc: 'Main landing page with featured videos' },
            { name: 'VideoStreamingPage', desc: 'Dedicated video playback interface' },
            { name: 'Footer', desc: 'Copyright info and policy links' }
          ].map((component) => (
            <div key={component.name} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="font-bold mb-2">{component.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{component.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contributing" title="Contributing" icon={Users}>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          <li>Fork the repository</li>
          <li>Create a new branch for your feature</li>
          <li>Make your changes and commit them</li>
          <li>Push your changes to your fork</li>
          <li>Open a pull request with details</li>
        </ol>
      </Section>

      <Section id="faq" title="FAQ" icon={HelpCircle}>
        <div className="space-y-4">
          {[
            { q: 'How do I reset my password?', a: 'Use the "Forgot Password?" link on the login page.' },
            { q: 'Is the application mobile-friendly?', a: 'Yes, the application is fully responsive and works on mobile devices.' },
            { q: 'Where can I report bugs?', a: 'Bugs can be reported in the Issues section of the GitHub repository.' }
          ].map((item, index) => (
            <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="font-bold mb-2">{item.q}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.a}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
    </div>
  );
}

export default Content;