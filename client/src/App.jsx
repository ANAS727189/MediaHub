import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import HomePage from "./components/HomePage/HomePage";
import Docs from "./components/Docs/Docs";
import VideoStreamingNew from "./components/StreamingPage/VideoStreaming";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { UserProvider } from "./context/UserContext";
import { SignIn, useUser } from "@clerk/clerk-react";
import MediaEditor from "./components/MediaEditor/MediaEditor";

function PrivateRoute({ children }) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}

function AdminRoute() {
  const { user } = useUser();
  const isAdmin = user?.emailAddresses[0]?.emailAddress.endsWith("@iiitdwd.ac.in");

  if (!isAdmin) {
    return <p>Unauthorized Access</p>;
  }

  return <AdminPanel />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/docs"
                element={
                  <PrivateRoute>
                    <Docs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/video-streaming"
                element={
                  <PrivateRoute>
                    <VideoStreamingNew />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminRoute />
                  </PrivateRoute>
                }
              />
              <Route
                path="/media"
                element={
                  <PrivateRoute>
                    <MediaEditor />
                  </PrivateRoute>
                }

              />
              <Route path="/sign-in" element={<SignIn />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
