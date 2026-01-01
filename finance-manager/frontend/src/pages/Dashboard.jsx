// pages/Dashboard.jsx - Glassmorphic Design System
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Home,
  Film,
  DollarSign,
  Users,
  ShieldCheck,
  TrendingUp,
  Loader2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";
import api from "../services/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data.stats);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          <p className="text-orange-400 font-medium text-lg">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Transactions Ledger</title>
      </Helmet>

      <div className="min-h-screen p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500/90 to-orange-600 rounded-xl flex items-center justify-center border border-orange-500/30">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Dashboard
            </h1>
          </div>
          <p className="text-neutral-300 ml-15 font-medium">
            Overview of your platform analytics
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-5 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 border-t-white/10 border-l-white/10 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-300 mb-1">
                Error Loading Dashboard
              </p>
              <p className="text-sm text-orange-400">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Movies */}
          <div className="group bg-neutral-900/40 backdrop-blur-md border border-neutral-800 border-t-white/20 border-l-white/20 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/90 to-blue-600 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Film className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-xl border border-green-500/20">
                <ArrowUp className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs font-bold text-green-400">12%</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm font-medium mb-2">
              Total Movies
            </p>
            <p className="text-4xl font-bold text-white mb-3">
              {stats?.totalMovies || 0}
            </p>
            <div className="pt-3 border-t border-neutral-800/50">
              <p className="text-xs text-neutral-500">
                <span className="text-neutral-300 font-semibold">
                  {stats?.publishedMovies || 0}
                </span>{" "}
                Published
              </p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="group bg-neutral-900/40 backdrop-blur-md border border-neutral-800 border-t-white/20 border-l-white/20 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/90 to-green-600 rounded-xl flex items-center justify-center border border-green-500/30">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-xl border border-green-500/20">
                <ArrowUp className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs font-bold text-green-400">23%</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm font-medium mb-2">
              Total Revenue
            </p>
            <p className="text-4xl font-bold text-white mb-3">
              {formatPrice(stats?.totalRevenue || 0)}
            </p>
            <div className="pt-3 border-t border-neutral-800/50">
              <p className="text-xs text-neutral-500">
                <span className="text-neutral-300 font-semibold">
                  {stats?.totalPayments || 0}
                </span>{" "}
                Payments
              </p>
            </div>
          </div>

          {/* Total Users */}
          <div className="group bg-neutral-900/40 backdrop-blur-md border border-neutral-800 border-t-white/20 border-l-white/20 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/90 to-purple-600 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-xl border border-green-500/20">
                <ArrowUp className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs font-bold text-green-400">8%</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm font-medium mb-2">
              Total Users
            </p>
            <p className="text-4xl font-bold text-white mb-3">
              {stats?.totalUsers || 0}
            </p>
            <div className="pt-3 border-t border-neutral-800/50">
              <p className="text-xs text-neutral-500">
                <span className="text-neutral-300 font-semibold">
                  {stats?.activeUsers || 0}
                </span>{" "}
                Active
              </p>
            </div>
          </div>

          {/* Active Access */}
          <div className="group bg-neutral-900/40 backdrop-blur-md border border-neutral-800 border-t-white/20 border-l-white/20 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500/90 to-orange-600 rounded-xl flex items-center justify-center border border-orange-500/30">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 rounded-xl border border-red-500/20">
                <ArrowDown className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs font-bold text-red-400">5%</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm font-medium mb-2">
              Active Access
            </p>
            <p className="text-4xl font-bold text-white mb-3">
              {stats?.activeAccess || 0}
            </p>
            <div className="pt-3 border-t border-neutral-800/50">
              <p className="text-xs text-neutral-500">
                <span className="text-neutral-300 font-semibold">
                  {stats?.expiredAccess || 0}
                </span>{" "}
                Expired
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Payments */}
          <div className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800 border-t-white/20 border-l-white/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800/50">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
                <DollarSign className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Recent Payments</h2>
            </div>
            <div className="space-y-3">
              {stats?.recentPayments?.length > 0 ? (
                stats.recentPayments.slice(0, 5).map((payment) => (
                  <div
                    key={payment.paymentId}
                    className="flex items-center justify-between p-4 bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate mb-1">
                        {payment.movie?.title || "Movie"}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="truncate">
                          {payment.user?.name || "Guest"}
                        </span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-green-400 ml-3">
                      {formatPrice(payment.amount)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-500 text-sm">No recent payments</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Movies */}
          <div className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800 border-t-white/20 border-l-white/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800/50">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Top Movies</h2>
            </div>
            <div className="space-y-3">
              {stats?.topMovies?.length > 0 ? (
                stats.topMovies.slice(0, 5).map((movie) => (
                  <div
                    key={movie._id}
                    className="flex items-center justify-between p-4 bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-11 h-11 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                        <Film className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate mb-1">
                          {movie.title}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {movie.revenue} revenue
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-sm font-bold text-white">
                        {movie.purchases}
                      </p>
                      <p className="text-xs text-neutral-500">purchases</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-500 text-sm">No movies yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
