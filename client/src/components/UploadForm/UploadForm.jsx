import { useState, useRef, useEffect } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';
import { ToggleTheme } from "../../context/UserContext";


export const UploadForm = ({ onUploadSuccess }) => {
  const { darkMode, userId } = ToggleTheme();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const textareaRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !userId) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('uploaderId', userId);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onUploadSuccess(data.video); // Pass entire video object
        setUploadSuccess(true);
        
        // Clear form fields after successful upload
        setFile(null);
        setDescription('');
        // ensure textarea height resets
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setUploadSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`rounded-3xl border p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ${darkMode ? 'border-gray-800 bg-[#111520]/80' : 'border-gray-200 bg-white/90'}`}>
      <div className="mb-5 flex items-center space-x-2">
        <div className={`rounded-2xl p-2 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
          <Upload className="h-5 w-5 text-blue-500" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">Upload Video</h2>
      </div>
      
      {uploadSuccess && (
        <div className={`mb-4 flex items-center space-x-2 rounded-2xl border p-3 ${darkMode ? 'border-green-500/20 bg-green-500/10' : 'border-green-200 bg-green-50'}`}>
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>Video uploaded successfully!</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className={`rounded-2xl border-2 border-dashed p-6 text-center ${darkMode ? 'border-gray-700 bg-white/[0.02]' : 'border-gray-300 bg-slate-50/50'}`}>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept="video/*"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            {file ? (
              <>
                <CheckCircle className="w-8 h-8 mb-2 text-green-500" />
                <p className="px-2 font-medium break-all">{file.name}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                  }}
                  className="flex items-center mt-2 text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4 mr-1" /> Remove
                </button>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2 text-blue-500" />
                <p className="font-medium">Click to select a video</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>or drag and drop</p>
              </>
            )}
          </label>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={2}
            onInput={() => {
              const el = textareaRef.current;
              if (!el) return;
              el.style.height = 'auto';
              el.style.height = Math.min(el.scrollHeight, 300) + 'px';
            }}
            className={`mt-1 w-full rounded-2xl border px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500/30 textarea-scrollbar resize-none scrollbar-thin ${darkMode ? 'border-gray-700 bg-[#0B0D14] text-white placeholder:text-gray-500' : 'border-gray-200 bg-slate-50 text-slate-900 placeholder:text-slate-400'}`}
          />
        </div>
        
        <button
          type="submit"
          disabled={!file || uploading}
          className={`mt-4 flex w-full items-center justify-center space-x-2 rounded-2xl px-4 py-3 font-semibold transition-all ${
            file && !uploading
              ? 'bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.99]'
              : `${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-400'}`
          }`}
        >
          {uploading ? (
            <span>Uploading...</span>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload Video</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};


export default UploadForm;
