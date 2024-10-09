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
  Key
} from "lucide-react";
import { ToggleTheme } from "../../context/UserContext";

const AdminPanel = () => {
  const { user } = useUser();
  const { session } = useSession();
  const { darkMode } = ToggleTheme();

  const [recentActivities, setRecentActivities] = useState([]);
  const [activeUserCount, setActiveUserCount] = useState(0);

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
      </div>
    </div>
  );
};

export default AdminPanel;