import { useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';
import { ToggleTheme } from "../../context/UserContext";


export const UploadForm = ({ onUploadSuccess }) => {
  const { darkMode } = ToggleTheme();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description); // Send the description along with file

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onUploadSuccess(data.video.videoPath); // Adjust according to returned object
        setUploadSuccess(true);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}>
      <div className="flex items-center mb-4 space-x-2">
        <Upload className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Upload Video</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className={`border-2 border-dashed rounded-lg p-6 text-center ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
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
                <p className="font-medium">{file.name}</p>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            className={`mt-1 p-2 w-full border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
          />
        </div>
        
        <button
          type="submit"
          disabled={!file || uploading}
          className={`mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
            file && !uploading
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
          } transition-colors duration-200`}
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
