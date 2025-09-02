// Video integrity utilities

export const checkVideoFileExists = async (videoUrl) => {
  try {
    const response = await fetch(videoUrl, { 
      method: 'HEAD',
      headers: {
        'Accept': 'application/vnd.apple.mpegurl,*/*'
      }
    });
    
    return {
      exists: response.ok,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      exists: false,
      status: 0,
      statusText: 'Network Error',
      error: error.message
    };
  }
};

export const getVideoIntegrityReport = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/check-integrity`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to get video integrity report: ${error.message}`);
  }
};

export const cleanupOrphanedVideoRecords = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/cleanup-orphaned?confirm=true`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to cleanup orphaned records: ${error.message}`);
  }
};

export const formatVideoErrorMessage = (video, checkResult) => {
  if (checkResult.error === 'Network Error') {
    return `
🔴 Network Error

Unable to verify if the video "${video.title}" is available.

This could be due to:
• Network connectivity issues  
• CORS restrictions
• Server is temporarily unavailable

Would you like to try loading the video anyway?
    `.trim();
  }

  return `
🔴 Video File Not Found

The video "${video.title}" is no longer available on the server.

Possible reasons:
• File was deleted from server storage
• Server deployment reset the uploads folder  
• Database record exists but video file is missing

Status: ${checkResult.status} ${checkResult.statusText}
  `.trim();
};
