// App.jsx - Fixed Navbar Height (No Overlap)
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./App.css";

// Import pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Default Route Component
const DefaultRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <iframe
          src="https://www.unicorn.studio/embed/jYxrWzSRtsXNqZADHnVH"
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
          title="Background Animation"
        />

        {/* Loading Content */}
        <div className="w-full max-w-md relative z-10 text-center">
          <div className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800 border-t-white/20 border-l-white/20 rounded-xl p-8">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 flex-shrink-0"></div>
            <p className="text-orange-400 text-lg font-medium">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

// Layout Wrapper Component
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const noLayoutRoutes = ["/login"];
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!showLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Animated Background */}
      <iframe
        src="https://www.unicorn.studio/embed/jYxrWzSRtsXNqZADHnVH"
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
        title="Background Animation"
      />

      {/* Navbar - Fixed Height */}
      <Navbar navigationLinks={[]} />

      {/* Main Content Area - Proper Navbar Offset */}
      <div className="flex-1 relative z-10 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <main
            className={`
              pt-20 md:pt-24 
              pb-8 
              px-6 md:px-8 lg:px-12 
              transition-all duration-300
            `}
          >
            <div className="w-full rounded-xl overflow-hidden border border-neutral-800 border-t-white/20 border-l-white/20 bg-neutral-900/40 backdrop-blur-md">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <LayoutWrapper>
          <Routes>
            {/* Login Route */}
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<DefaultRoute />} />

            {/* 404 fallback */}
            <Route path="*" element={<DefaultRoute />} />
          </Routes>
        </LayoutWrapper>
      </AuthProvider>
    </Router>
  );
}

export default App;
