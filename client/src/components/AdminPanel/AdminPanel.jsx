import { lazy } from "react";
import React, { useState, useEffect } from "react";
import { useUser, useSession } from "@clerk/clerk-react";
import { 
  User, 
  Clock, 
  Users, 
  Activity,
  Mail,
  Badge,
  CreditCard,
  Key,
  Video,
  AlertTriangle,
  CheckCircle,
  Trash2,
  RefreshCw
} from "lucide-react";
import { ToggleTheme } from "../../context/UserContext";

const AdminPanel = () => {
  const { user } = useUser();
  const { session } = useSession();
  const { darkMode } = ToggleTheme();

  const [recentActivities, setRecentActivities] = useState([]);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [videoIntegrity, setVideoIntegrity] = useState(null);
  const [checkingIntegrity, setCheckingIntegrity] = useState(false);
  const [cleaningUp, setCleaningUp] = useState(false);

  useEffect(() => {
    const activities = JSON.parse(localStorage.getItem("activities")) || [];
    setRecentActivities(activities);
  }, []);

  useEffect(() => {
    let count = parseInt(sessionStorage.getItem("activeUsers") || 0);
    count++;
    setActiveUserCount(count);
    sessionStorage.setItem("activeUsers", count);
  }, []);

  const checkVideoIntegrity = async () => {
    setCheckingIntegrity(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/check-integrity`);
      const data = await response.json();
      setVideoIntegrity(data);
    } catch (error) {
      console.error('Error checking video integrity:', error);
      alert('Failed to check video integrity: ' + error.message);
    } finally {
      setCheckingIntegrity(false);
    }
  };

  const cleanupOrphanedRecords = async () => {
    if (!videoIntegrity || videoIntegrity.summary.broken === 0) {
      alert('No orphaned records to clean up');
      return;
    }

    const confirmCleanup = confirm(
      `This will permanently delete ${videoIntegrity.summary.broken} database records for videos whose files are missing. Are you sure?`
    );

    if (!confirmCleanup) return;

    setCleaningUp(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/cleanup-orphaned?confirm=true`, {
        method: 'DELETE'
      });
      const data = await response.json();
      alert(data.message);
      
      // Refresh the integrity check
      await checkVideoIntegrity();
    } catch (error) {
      console.error('Error cleaning up orphaned records:', error);
      alert('Failed to clean up orphaned records: ' + error.message);
    } finally {
      setCleaningUp(false);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <User className="mr-2 h-8 w-8 text-indigo-500" />
          Admin Dashboard
        </h1>
        <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Welcome, Admin {user?.firstName}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Profile Card */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Badge className="mr-2 h-5 w-5 text-indigo-500" />
              User Profile
            </h2>
            <div className="space-y-3">
              <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <User className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className="font-medium">{user?.firstName} {user?.lastName}</span>
              </div>
              <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Mail className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span>{user?.emailAddresses[0]?.email}</span>
              </div>
              <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Badge className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span>Role: {user?.publicMetadata?.role || "N/A"}</span>
              </div>
              <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <CreditCard className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span>Plan: {user?.publicMetadata?.plan || "Free"}</span>
              </div>
            </div>
          </div>

          {/* Session Information Card */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Key className="mr-2 h-5 w-5 text-indigo-500" />
              Session Information
            </h2>
            <div className="space-y-3">
              <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Key className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span>Session ID: {session?.id}</span>
              </div>
              <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Clock className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span>Last Sign-In: {new Date(session?.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Active Users Card */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Users className="mr-2 h-5 w-5 text-indigo-500" />
              Active Users
            </h2>
            <div className="text-3xl font-bold text-indigo-500">
              {activeUserCount}
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>currently online</p>
          </div>

          {/* Recent Activities Card */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Activity className="mr-2 h-5 w-5 text-indigo-500" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className={`flex items-start space-x-3 ${darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-200'} border-b pb-3`}>
                    <Activity className={`h-5 w-5 mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No recent activities.</p>
              )}
            </div>
          </div>
        </div>

        {/* Video Integrity Management Section */}
        <div className={`mt-8 rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <Video className="mr-2 h-5 w-5 text-indigo-500" />
            Video Integrity Management
          </h2>
          
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={checkVideoIntegrity}
                disabled={checkingIntegrity}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  checkingIntegrity
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${checkingIntegrity ? 'animate-spin' : ''}`} />
                {checkingIntegrity ? 'Checking...' : 'Check Video Integrity'}
              </button>

              {videoIntegrity && videoIntegrity.summary.broken > 0 && (
                <button
                  onClick={cleanupOrphanedRecords}
                  disabled={cleaningUp}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    cleaningUp
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white transition-colors`}
                >
                  <Trash2 className={`mr-2 h-4 w-4 ${cleaningUp ? 'animate-pulse' : ''}`} />
                  {cleaningUp ? 'Cleaning...' : `Clean Up ${videoIntegrity.summary.broken} Orphaned Records`}
                </button>
              )}
            </div>

            {videoIntegrity && (
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center">
                      <Video className="h-8 w-8 text-blue-500 mr-2" />
                      <div>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {videoIntegrity.summary.total}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Total Videos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                      <div>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {videoIntegrity.summary.good}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Working Videos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center">
                      <AlertTriangle className="h-8 w-8 text-red-500 mr-2" />
                      <div>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {videoIntegrity.summary.broken}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Broken Videos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {videoIntegrity.details.filter(v => v.status === 'MISSING_FILES').length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Broken Videos (Missing Files)
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {videoIntegrity.details
                        .filter(v => v.status === 'MISSING_FILES')
                        .map((video, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'} border-l-4 border-red-500`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {video.title}
                                </p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Path: {video.videoPath}
                                </p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Directory exists: {video.dirExists ? '✅' : '❌'} | 
                                  Video file: {video.videoExists ? '✅' : '❌'} | 
                                  Thumbnail: {video.thumbnailExists ? '✅' : '❌'}
                                </p>
                                {video.dirContents.length > 0 && (
                                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                    Dir contents: {video.dirContents.join(', ')}
                                  </p>
                                )}
                              </div>
                              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;