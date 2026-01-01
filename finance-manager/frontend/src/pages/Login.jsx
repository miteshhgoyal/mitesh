// Login.jsx
import React, { useState } from "react";
import {
  Lock,
  RotateCcw,
  LogIn,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import ShimmerButton from "../components/ShimmerButton";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    accessPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accessPassword.trim()) {
      newErrors.accessPassword = "Access password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) {
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");
    setErrors({});

    try {
      const response = await api.post("/auth/login", {
        accessPassword: formData.accessPassword,
      });

      if (response.data.success) {
        setSuccessMessage("Authentication successful! Redirecting...");
        login(response.data.data);

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 800);
      } else {
        setErrors({
          submit: response.data.message || "Authentication failed",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      accessPassword: "",
    });
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      {/* Animated Background */}
      <iframe
        src="https://www.unicorn.studio/embed/jYxrWzSRtsXNqZADHnVH"
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
        title="Background Animation"
      />

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Login Form */}
        <div className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800 border-t-white/20 border-l-white/20 rounded-xl p-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 border-t-white/10 border-l-white/10 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <span className="text-sm font-medium text-orange-400">
                {successMessage}
              </span>
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 border-t-white/10 border-l-white/10 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <span className="text-sm font-medium text-orange-300">
                {errors.submit}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Access Password */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Access Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="accessPassword"
                  value={formData.accessPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full pl-12 pr-12 py-3.5 bg-black/50 border ${
                    errors.accessPassword
                      ? "border-orange-500"
                      : "border-neutral-800 border-t-white/5 border-l-white/5"
                  } rounded-lg text-white placeholder-neutral-700 focus:outline-none focus:border-orange-500 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-orange-500 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.accessPassword && (
                <p className="mt-2 text-xs text-orange-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.accessPassword}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <ShimmerButton
                type="button"
                onClick={resetForm}
                variant="gray"
                size="md"
                icon={RotateCcw}
                className="flex-1"
              >
                Reset
              </ShimmerButton>

              <ShimmerButton
                type="submit"
                variant="gradient"
                size="md"
                icon={isLoading ? Loader2 : LogIn}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Authenticating..." : "Access"}
              </ShimmerButton>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-600 text-xs mt-2">
          © {new Date().getFullYear()} Transactions Ledger. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
