// Navbar.jsx - Simple Logout Confirmation Modal
import React, { useState, useEffect } from "react";
import {
  LogOut,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../services/tokenService";
import ShimmerButton from "../components/ShimmerButton";

const Navbar = ({ navigationLinks }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      tokenService.removeToken();
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      tokenService.removeToken();
      logout();
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 md:h-20 z-50">
        <div className="w-full h-full bg-neutral-900/40 backdrop-blur-md border-b border-neutral-800 border-t-white/20 px-6 md:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Logo */}
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-500/90 to-orange-600 rounded-xl flex items-center justify-center border border-orange-500/30">
                <Shield className="w-5.5 h-5.5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-lg md:text-xl text-white leading-tight truncate">
                  Transactions Ledger
                </h1>
                <p className="text-xs text-orange-400 font-medium truncate mt-0.5">
                  {user.name || "Administrator"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Admin Badge */}
            {user.isAdmin && (
              <div className="hidden sm:flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/20 border-t-white/10 border-l-white/10 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-semibold text-orange-400">
                  Admin
                </span>
              </div>
            )}

            {/* Logout Shimmer Button */}
            <ShimmerButton
              variant="gradient"
              size="sm"
              icon={LogOut}
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex-shrink-0"
            >
              Sign Out
            </ShimmerButton>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsLogoutModalOpen(false)}
          />

          {/* Modal Card */}
          <div className="w-full max-w-md relative z-10">
            <div className="bg-neutral-900/50 backdrop-blur-lg border border-neutral-800 border-t-white/20 border-l-white/20 rounded-2xl p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Sign Out?
                  </h2>
                  <p className="text-neutral-300 text-sm">
                    Are you sure you want to sign out? You'll need to log back
                    in to access your dashboard.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <ShimmerButton
                  variant="gray"
                  size="md"
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </ShimmerButton>

                <ShimmerButton
                  variant="gradient"
                  size="md"
                  icon={isLoggingOut ? Loader2 : undefined}
                  onClick={handleLogoutConfirm}
                  disabled={isLoggingOut}
                  className="flex-1"
                >
                  {isLoggingOut ? "Signing out..." : "Sign Out"}
                </ShimmerButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
