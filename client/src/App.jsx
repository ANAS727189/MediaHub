import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import HomePage from "./components/HomePage/HomePage";
import Docs from "./components/Docs/Docs";
import VideoStreaming from "./components/StreamingPage/VideoStreaming";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { UserProvider } from "./context/UserContext";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import MediaEditor from "./components/MediaEditor/MediaEditor";

function App() {
  
  const AdminRoute = () => {
    const { user } = useUser();
    const isAdmin = user?.emailAddresses[0]?.emailAddress.endsWith("@iiitdwd.ac.in");
  
    if (!isAdmin) {
      return <p>Unauthorized Access</p>;
    }
  
    return <AdminPanel />;
  };
  
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
                  <SignedIn>
                    <Docs />
                  </SignedIn>
                }
              />
              <Route
                path="/video-streaming"
                element={
                  <SignedIn>
                    <VideoStreaming />
                  </SignedIn>
                }
              />
              <Route
                path="/admin"
                element={
                  <SignedIn>
                    <AdminRoute />
                  </SignedIn>
                }
              />
               <Route
                path="/media"
                element={
                  <SignedIn>
                    <MediaEditor />
                  </SignedIn>
                }
              />
              <Route
                path="/sign-in"
                element={
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                }
              />
              
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
