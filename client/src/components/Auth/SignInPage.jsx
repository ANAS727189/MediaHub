import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { ToggleTheme } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SignInPage = () => {
  const { darkMode } = ToggleTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-200 ${
        darkMode ? "bg-[#0B0D14]" : "bg-white"
      }`}
    >
      {/* ── Atmospheric glow blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -right-24 w-[640px] h-[640px] rounded-full blur-[140px] ${
            darkMode ? "bg-blue-600/10" : "bg-blue-400/12"
          }`}
        />
        <div
          className={`absolute -bottom-20 -left-10 w-[480px] h-[480px] rounded-full blur-[120px] ${
            darkMode ? "bg-indigo-800/8" : "bg-indigo-300/10"
          }`}
        />
      </div>

      {/* ── Dot grid texture ── */}
      <div
        className={`absolute inset-0 pointer-events-none dot-grid ${
          darkMode ? "text-gray-600/20" : "text-gray-400/30"
        }`}
      />

      {/* ── Back button ── */}
      <button
        onClick={() => navigate("/")}
        className={`absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
          darkMode
            ? "text-gray-400 hover:text-white hover:bg-white/5"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* ── Main content ── */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* ── Header ── */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-blue-500/20">
              <img
                src="/video.png"
                alt="MediaHub"
                className="w-8 h-8"
              />
            </div>
            <h1
              className={`text-3xl font-bold font-display tracking-tight ${
                darkMode ? "text-white" : "text-gray-950"
              }`}
            >
              Welcome to MediaHub
            </h1>
            <p
              className={`mt-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Professional media management, editing, and streaming platform
            </p>
          </div>

          {/* ── Clerk SignIn component with custom styling ── */}
          <div
            className={`relative rounded-2xl border backdrop-blur-xl transition-colors duration-200 ${
              darkMode
                ? "border-gray-700/50 bg-gradient-to-b from-gray-900/40 to-gray-950/40"
                : "border-gray-200/50 bg-gradient-to-b from-white/40 to-gray-50/40"
            }`}
          >
            <div className="p-6 sm:p-8">
              <SignIn
                appearance={{
                  baseTheme: darkMode ? "dark" : "light",
                  elements: {
                    rootBox: "w-full",
                    card: "w-full shadow-none bg-transparent",
                    headerTitle: `font-display font-bold text-lg ${
                      darkMode ? "text-white" : "text-gray-950"
                    }`,
                    headerSubtitle: `text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`,
                    socialButtonsBlockButton: `w-full border transition-all duration-200 ${
                      darkMode
                        ? "border-gray-600 bg-gray-800/40 text-gray-100 hover:bg-gray-700/50 hover:border-gray-500"
                        : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                    }`,
                    socialButtonsBlockButtonText: "font-medium",
                    formFieldInput: `w-full rounded-lg border transition-colors duration-200 ${
                      darkMode
                        ? "border-gray-600 bg-gray-800/30 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-800/50"
                        : "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white"
                    }`,
                    formFieldLabel: `text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`,
                    formResendCodeLink: `text-blue-500 hover:text-blue-400 font-medium`,
                    primaryButtonText: "font-semibold",
                    primaryButton: `w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg py-2.5 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]`,
                    dividerLine: `${darkMode ? "bg-gray-700/50" : "bg-gray-200/50"}`,
                    dividerText: `${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`,
                    footerActionLink: "text-blue-500 hover:text-blue-400 font-medium",
                    footerActionText: `${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`,
                    tagPrimary: `bg-blue-500/20 text-blue-400 border-blue-500/30`,
                  },
                  variables: {
                    colorPrimary: "#3B82F6",
                    colorBackground: darkMode ? "#0F172A" : "#FFFFFF",
                    colorInputBackground: darkMode ? "#1F2937" : "#FFFFFF",
                    colorInputBorder: darkMode ? "#4B5563" : "#E5E7EB",
                    colorText: darkMode ? "#F3F4F6" : "#111827",
                    colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",
                  },
                }}
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                redirectUrl={"/"}
              />
            </div>
          </div>

          {/* ── Footer text ── */}
          <p
            className={`mt-6 text-center text-xs ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
