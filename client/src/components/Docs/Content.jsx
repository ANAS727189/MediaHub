import React from 'react';
import { ToggleTheme } from "../../context/UserContext";
import { BookOpen, Download, Code, Server, Users, HelpCircle, Zap, Settings } from 'lucide-react';

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

  const CodeBlock = ({ children, title }) => (
    <div className="mb-6">
      {title && (
        <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {title}
        </h4>
      )}
      <pre className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${
        darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'
      }`}>
        <code>{children}</code>
      </pre>
    </div>
  );

  const FeatureCard = ({ icon: Icon, title, description, status = "✅" }) => (
    <div className={`p-4 rounded-lg border ${
      darkMode 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    } transition-colors hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-3">
        <Icon className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <span className="text-sm">{status}</span>
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );

  return (
    <div className={`h-full transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
    }`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            MediaHub Documentation
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            A comprehensive platform for video streaming, media editing, and content management
          </p>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
            <p className="text-sm">
              Built with modern web technologies including React, Node.js, MongoDB, and Cloudinary. 
              Features professional video streaming, comprehensive media editing tools, and secure user authentication.
            </p>
          </div>
        </div>

        <Section id="introduction" title="Introduction" icon={BookOpen}>
          <p className="mb-6 leading-relaxed">
            MediaHub is a full-stack web application designed for comprehensive media management. 
            It combines powerful video streaming capabilities with professional-grade editing tools, 
            all wrapped in a modern, responsive user interface.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <FeatureCard 
              icon={BookOpen}
              title="Video Streaming" 
              description="HLS-based video streaming with real-time analytics and professional player controls"
            />
            <FeatureCard 
              icon={Settings}
              title="Media Editor" 
              description="Comprehensive image and video editing tools with format conversion capabilities"
            />
            <FeatureCard 
              icon={Users}
              title="User Management" 
              description="Secure authentication powered by Clerk with role-based access control"
            />
            <FeatureCard 
              icon={Zap}
              title="Modern Stack" 
              description="Built with React, Node.js, MongoDB, and deployed on cloud infrastructure"
            />
          </div>

          <h3 className="text-xl font-bold mb-4">Key Features</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>🎥 <strong>HLS Video Streaming</strong> - Adaptive bitrate streaming with FFmpeg processing</li>
            <li>🖼️ <strong>Media Editor</strong> - Professional image and video editing capabilities</li>
            <li>🔄 <strong>Format Conversion</strong> - Support for 15+ image and video formats</li>
            <li>📊 <strong>Analytics</strong> - Real-time view tracking and engagement metrics</li>
            <li>🔐 <strong>Authentication</strong> - Secure user management with Clerk</li>
            <li>📱 <strong>Responsive Design</strong> - Optimized for all devices and screen sizes</li>
            <li>🌓 <strong>Theme Support</strong> - Dark and light mode with system detection</li>
          </ul>
        </Section>

      <Section id="installation" title="Installation & Setup" icon={Download}>
        <p className="mb-6">Follow these steps to set up MediaHub on your local machine:</p>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Node.js (v18.0 or higher)</li>
            <li>npm or yarn package manager</li>
            <li>MongoDB database (local or cloud)</li>
            <li>FFmpeg for video processing</li>
            <li>Modern web browser</li>
            <li>Code editor (VS Code recommended)</li>
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">1. Clone the Repository</h4>
            <CodeBlock title="Terminal">{`git clone https://github.com/your-username/MediaHub.git
cd MediaHub`}</CodeBlock>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">2. Install Dependencies</h4>
            <CodeBlock title="Install client dependencies">{`cd client
npm install`}</CodeBlock>
            <CodeBlock title="Install server dependencies">{`cd ../server
npm install`}</CodeBlock>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">3. Environment Configuration</h4>
            <p className="mb-3">Create environment files in both client and server directories:</p>
            
            <CodeBlock title="Client environment (client/.env)">{`VITE_API_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here`}</CodeBlock>
            
            <CodeBlock title="Server environment (server/.env)">{`PORT=8000
MONGODB_URI=mongodb://localhost:27017/mediahub
# or mongodb+srv://username:password@cluster.mongodb.net/mediahub

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Clerk Configuration
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here`}</CodeBlock>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">4. Start Development Servers</h4>
            <CodeBlock title="Terminal 1: Backend server">{`cd server
npm run dev
# Server will start on http://localhost:8000`}</CodeBlock>
            
            <CodeBlock title="Terminal 2: Frontend development server">{`cd client
npm run dev
# Client will start on http://localhost:5173`}</CodeBlock>
          </div>
        </div>

        <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-50'} border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
          <p className="text-sm">
            ✅ <strong>Success!</strong> Your MediaHub application should now be running:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm space-y-1">
            <li><strong>Frontend:</strong> http://localhost:5173</li>
            <li><strong>Backend API:</strong> http://localhost:8000</li>
            <li><strong>Database:</strong> Connected to MongoDB</li>
            <li><strong>Media Processing:</strong> FFmpeg and Sharp ready</li>
          </ul>
        </div>
      </Section>

      <Section id="usage" title="API Documentation" icon={Code}>
        <p className="mb-6">MediaHub provides a comprehensive REST API for managing media content and user interactions:</p>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Media Endpoints</h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 text-xs font-mono bg-green-500 text-white rounded">GET</span>
                  <code className="font-mono">/api/media</code>
                </div>
                <p className="text-sm mb-3">Retrieve all media files with pagination and filtering</p>
                <CodeBlock title="Response">{`{
  "success": true,
  "data": [
    {
      "_id": "video_id",
      "title": "Sample Video",
      "description": "Video description",
      "duration": "2:35",
      "views": 1250,
      "uploadedBy": "user_id",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}`}</CodeBlock>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 text-xs font-mono bg-blue-500 text-white rounded">POST</span>
                  <code className="font-mono">/api/media/upload</code>
                </div>
                <p className="text-sm mb-3">Upload new media files (supports video, image, audio)</p>
                <CodeBlock title="Request Body (multipart/form-data)">{`{
  "file": File,
  "title": "My Video Title",
  "description": "Optional description",
  "tags": ["tag1", "tag2"]
}`}</CodeBlock>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 text-xs font-mono bg-orange-500 text-white rounded">PUT</span>
                  <code className="font-mono">/api/media/:id</code>
                </div>
                <p className="text-sm mb-3">Update media metadata and settings</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Media Editor API</h3>
            <p className="mb-4">Professional-grade editing tools accessible via API:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className="font-bold mb-2">Image Processing</h4>
                <ul className="text-sm space-y-1">
                  <li>• Resize & Crop</li>
                  <li>• Format Conversion (JPEG, PNG, WebP, AVIF)</li>
                  <li>• Filters & Effects</li>
                  <li>• Quality Optimization</li>
                </ul>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className="font-bold mb-2">Video Processing</h4>
                <ul className="text-sm space-y-1">
                  <li>• HLS Streaming Preparation</li>
                  <li>• Format Conversion (MP4, WebM, AVI)</li>
                  <li>• Compression & Optimization</li>
                  <li>• Thumbnail Generation</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Authentication</h3>
            <p className="mb-4">All API requests require authentication via Clerk tokens:</p>
            <CodeBlock title="Authorization Header">{`Authorization: Bearer <clerk_session_token>`}</CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="components" title="Architecture & Components" icon={Server}>
        <p className="mb-6">MediaHub is built with a modular architecture for scalability and maintainability:</p>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Frontend Architecture</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <FeatureCard
                icon={BookOpen}
                title="HomePage & HeroSection"
                description="Landing page with dynamic content, feature highlights, and user onboarding"
              />
              <FeatureCard
                icon={Settings}
                title="MediaEditor"
                description="Comprehensive editing suite with image, video, and format conversion tools"
              />
              <FeatureCard
                icon={Code}
                title="VideoPlayer & Streaming"
                description="HLS-based video player with analytics, controls, and responsive design"
              />
              <FeatureCard
                icon={Users}
                title="UploadForm & Gallery"
                description="Drag-and-drop uploads with progress tracking and media gallery management"
              />
              <FeatureCard
                icon={Server}
                title="AdminPanel"
                description="Content management dashboard with user analytics and system monitoring"
              />
              <FeatureCard
                icon={HelpCircle}
                title="Documentation"
                description="Comprehensive docs system with search, navigation, and interactive examples"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Backend Services</h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">📁 Media Processing Pipeline</h4>
                <p className="text-sm mb-3">Handles file uploads, format conversion, and optimization using FFmpeg and Sharp</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Automatic video transcoding to HLS format</li>
                  <li>Image optimization and WebP conversion</li>
                  <li>Thumbnail generation and metadata extraction</li>
                  <li>Cloud storage integration with Cloudinary</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">🗄️ Database Layer</h4>
                <p className="text-sm mb-3">MongoDB with structured schemas for scalable data management</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Media metadata and file references</li>
                  <li>User analytics and view tracking</li>
                  <li>Upload history and processing status</li>
                  <li>Optimized queries with indexing</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">🔐 Authentication & Security</h4>
                <p className="text-sm mb-3">Clerk-powered authentication with role-based access control</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>JWT token validation and refresh</li>
                  <li>Role-based permissions (user, admin)</li>
                  <li>API rate limiting and CORS configuration</li>
                  <li>Secure file upload validation</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Technology Stack</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Frontend Technologies</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>React 18</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>UI Framework</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vite</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Build Tool</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tailwind CSS</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Styling</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lucide React</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Icons</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Video.js</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Video Player</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Backend Technologies</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Node.js</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Runtime</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express.js</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Web Framework</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MongoDB</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Database</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FFmpeg</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Video Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sharp</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Image Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cloudinary</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Media CDN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contributing" title="Contributing & Development" icon={Users}>
        <p className="mb-6">We welcome contributions to MediaHub! Here's how you can help improve the platform:</p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Development Workflow</h3>
            <ol className="list-decimal list-inside space-y-3 mb-6">
              <li><strong>Fork the repository</strong> from the main branch on GitHub</li>
              <li><strong>Clone your fork</strong> to your local development environment</li>
              <li><strong>Create a feature branch</strong> with a descriptive name (e.g., <code>feature/video-analytics</code>)</li>
              <li><strong>Make your changes</strong> following our coding standards and best practices</li>
              <li><strong>Test thoroughly</strong> using our test suite and manual testing</li>
              <li><strong>Commit your changes</strong> with clear, descriptive commit messages</li>
              <li><strong>Push to your fork</strong> and create a pull request with detailed description</li>
              <li><strong>Respond to feedback</strong> and iterate on your changes as needed</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Development Setup</h3>
            <CodeBlock title="Development Environment">{`# Install development dependencies
npm install --save-dev

# Run tests
npm test

# Start development with hot reload
npm run dev

# Run linting and formatting
npm run lint
npm run format`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Coding Standards</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className="font-bold mb-2">Frontend Guidelines</h4>
                <ul className="text-sm space-y-1">
                  <li>• Use TypeScript for type safety</li>
                  <li>• Follow React Hooks patterns</li>
                  <li>• Implement responsive design</li>
                  <li>• Maintain accessibility standards</li>
                  <li>• Use Tailwind CSS utilities</li>
                </ul>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className="font-bold mb-2">Backend Guidelines</h4>
                <ul className="text-sm space-y-1">
                  <li>• RESTful API design principles</li>
                  <li>• Proper error handling & logging</li>
                  <li>• Input validation & sanitization</li>
                  <li>• Database query optimization</li>
                  <li>• Security best practices</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Areas for Contribution</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">🎨 UI/UX Improvements</h4>
                <p className="text-sm">Enhance user interface, animations, and overall user experience</p>
              </div>
              
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">🔧 Feature Development</h4>
                <p className="text-sm">Add new editing tools, streaming features, or integrations</p>
              </div>
              
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">🐛 Bug Fixes</h4>
                <p className="text-sm">Identify and resolve issues in existing functionality</p>
              </div>
              
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">📚 Documentation</h4>
                <p className="text-sm">Improve guides, API docs, and code comments</p>
              </div>
              
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">🚀 Performance</h4>
                <p className="text-sm">Optimize loading times, reduce bundle size, improve efficiency</p>
              </div>
              
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold mb-2">🧪 Testing</h4>
                <p className="text-sm">Expand test coverage and improve testing infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" title="FAQ & Troubleshooting" icon={HelpCircle}>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                { 
                  q: 'What video formats are supported for upload?', 
                  a: 'MediaHub supports MP4, WebM, AVI, MOV, and many other formats. Videos are automatically converted to HLS for optimized streaming.' 
                },
                { 
                  q: 'How do I reset my password?', 
                  a: 'Use the "Forgot Password?" link on the login page. Password reset is handled securely through Clerk authentication.' 
                },
                { 
                  q: 'Is the application mobile-friendly?', 
                  a: 'Yes! MediaHub is fully responsive and optimized for mobile devices, tablets, and desktop screens.' 
                },
                { 
                  q: 'What are the file size limits for uploads?', 
                  a: 'Current limits are 500MB for videos and 50MB for images. Contact support for enterprise limits.' 
                },
                { 
                  q: 'Can I use the media editor tools offline?', 
                  a: 'The media editor requires an internet connection as processing is handled by our cloud infrastructure.' 
                },
                { 
                  q: 'How can I integrate MediaHub with my existing website?', 
                  a: 'Use our REST API endpoints to integrate video streaming and editing capabilities into your application.' 
                }
              ].map((item, index) => (
                <div key={index} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h4 className="font-bold mb-2">{item.q}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Common Issues & Solutions</h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
                <h4 className="font-bold mb-2 text-red-600">🚨 Upload fails or times out</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Check your internet connection stability</li>
                  <li>Verify file size is within limits</li>
                  <li>Try uploading during off-peak hours</li>
                  <li>Clear browser cache and cookies</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'}`}>
                <h4 className="font-bold mb-2 text-yellow-600">⚠️ Video won't play or load</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Ensure your browser supports HTML5 video</li>
                  <li>Check if video processing is still in progress</li>
                  <li>Try refreshing the page or clearing cache</li>
                  <li>Verify network connectivity and speed</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                <h4 className="font-bold mb-2 text-blue-600">ℹ️ Media editor tools not responding</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Refresh the page and try again</li>
                  <li>Check browser console for error messages</li>
                  <li>Ensure JavaScript is enabled</li>
                  <li>Try using a different browser or device</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Getting Help</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className="font-bold mb-2">📧 Support Channels</h4>
                <ul className="text-sm space-y-1">
                  <li>• GitHub Issues for bug reports</li>
                  <li>• Discord community for discussions</li>
                  <li>• Email support for urgent issues</li>
                  <li>• Documentation for self-service help</li>
                </ul>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className="font-bold mb-2">🛠️ Debug Information</h4>
                <p className="text-sm mb-2">When reporting issues, include:</p>
                <ul className="text-sm space-y-1">
                  <li>• Browser version and OS</li>
                  <li>• Console error messages</li>
                  <li>• Steps to reproduce the issue</li>
                  <li>• Screenshots or video if applicable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
    </div>
  );
}

export default Content;