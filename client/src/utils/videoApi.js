const API_BASE_URL = import.meta.env.VITE_BACKEND_URI || 'http://localhost:8000';

export const videoApi = {
    incrementViews: async (videoId) => {
        try {
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/view`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to increment view count');
        }
        
        return await response.json();
        } catch (error) {
        console.error('Error incrementing view count:', error);
        return null;
        }
    },
    getVideoMetadata: async (videoId) => {
        try {
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}`);
        
        if (!response.ok) {
            throw new Error('Failed to get video metadata');
        }
        
        return await response.json();
        } catch (error) {
        console.error('Error fetching video metadata:', error);
        return null;
        }
    },
    extractDurationFromUrl: (videoUrl) => {
        return new Promise((resolve) => {
        if (!videoUrl) {
            resolve('0:00');
            return;
        }

        const video = document.createElement('video');
        video.preload = 'metadata';
        
        video.onloadedmetadata = () => {
            const duration = Math.floor(video.duration);
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            const formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            resolve(formatted);
        };
        
        video.onerror = () => {
            resolve('0:00');
        };
        setTimeout(() => resolve('0:00'), 5000);
        
        video.src = videoUrl;
        });
    }
};

export default videoApi;
