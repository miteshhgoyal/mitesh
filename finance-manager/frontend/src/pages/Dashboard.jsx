// Cleaned and Modularized Dashboard.jsx - COMPLETE WORKING VERSION
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Helmet } from "react-helmet";
import {
  Loader2,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  ChevronUp,
} from "lucide-react";
import api from "../services/api";

// Shared Formatting Hook
const useFormat = () => {
  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(Math.abs(price));
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  return { formatPrice, formatDate };
};

// Utility Functions
const hexToRgba = (hex, alpha = 0.1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Reusable Components
const TransactionRow = ({ transaction, index, formatPrice, formatDate }) => {
  return (
    <div
      className={`grid grid-cols-[minmax(200px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(120px,1.5fr)_minmax(100px,1fr)_minmax(100px,1fr)] items-center gap-4 p-5 border-b border-neutral-800/30 transition-all duration-200 last:border-b-0 ${
        index % 2 === 0 ? "bg-neutral-900/30" : "bg-neutral-900/10"
      }`}
    >
      {/* Transaction */}
      <div className="min-w-0 pl-1 space-y-1">
        <p className="text-sm font-semibold text-white truncate hover:text-orange-400">
          {transaction.name}
        </p>
        <p className="text-xs text-neutral-500 line-clamp-2">
          {transaction.description || "No description"}
        </p>
      </div>

      {/* Date */}
      <div className="flex items-center justify-center text-sm text-neutral-400 min-h-[44px]">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">
            {formatDate(transaction.date)}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="flex flex-col items-end min-h-[44px] pr-3">
        <p
          className={`text-base font-bold whitespace-nowrap ${
            (transaction.netAmount || 0) > 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {formatPrice(transaction.netAmount)}
        </p>
        <p className="text-xs text-neutral-500 whitespace-nowrap">
          {formatPrice(transaction.amount)}
        </p>
      </div>

      {/* Tags */}
      <TagList tags={transaction.tags?.slice(0, 2) || []} />

      {/* Component */}
      <ColoredBadge
        name={transaction.wealthComponent?.name || "N/A"}
        color={transaction.wealthComponent?.color || "#6b7280"}
      />

      {/* From */}
      <ColoredBadge
        name={transaction.deductedFrom?.name || "N/A"}
        color={transaction.deductedFrom?.color || "#6b7280"}
      />
    </div>
  );
};

const TagList = ({ tags }) => (
  <div className="flex items-center justify-center min-h-[44px]">
    <div className="flex flex-wrap gap-1.5 justify-center max-w-[120px]">
      {tags.map((tag) => (
        <div
          key={tag._id}
          className="px-2 py-0.5 rounded-lg text-xs font-medium border whitespace-nowrap"
          style={{
            backgroundColor: hexToRgba(tag.color, 0.15),
            borderColor: hexToRgba(tag.color, 0.4),
            color: tag.color,
          }}
        >
          {tag.name}
        </div>
      ))}
    </div>
  </div>
);

const ColoredBadge = ({ name, color }) => (
  <div className="flex items-center justify-center min-h-[44px]">
    <div
      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border max-w-[110px] truncate text-center"
      style={{
        backgroundColor: hexToRgba(color, 0.15),
        borderColor: hexToRgba(color, 0.4),
        color,
      }}
    >
      {name}
    </div>
  </div>
);

const MonthHeader = ({
  monthYear,
  stats,
  isExpanded,
  onToggle,
  count,
  formatPrice,
}) => (
  <div className="p-6 bg-neutral-900/70 border-b border-neutral-800/50 sticky top-0 z-20">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-orange-400" />
        <h3 className="text-xl font-bold text-white">{monthYear}</h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right hidden md:block">
          <div className="text-xs text-neutral-500 mb-1">Net</div>
          <div
            className={`text-sm font-semibold ${
              stats.net >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {formatPrice(stats.net)}
          </div>
        </div>
        <div className="text-sm text-neutral-400 font-medium hidden sm:block">
          {count} txns
        </div>
        <button
          onClick={onToggle}
          className="p-2.5 rounded-lg bg-neutral-800/60 hover:bg-neutral-700/60 transition-all text-neutral-400 hover:text-white flex items-center justify-center w-10 h-10"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  </div>
);

const MobileHeader = () => (
  <div className="sm:hidden grid grid-cols-[minmax(160px,2fr)_minmax(80px,1fr)_minmax(80px,1fr)_minmax(100px,1.5fr)_minmax(80px,1fr)_minmax(80px,1fr)] items-center gap-3 p-4 border-b border-neutral-800/50 text-xs font-semibold text-neutral-300 sticky left-0 z-10 bg-neutral-900/50">
    <span className="text-left pl-1">Transaction</span>
    <span className="text-center">Date</span>
    <span className="text-right pr-2">Amount</span>
    <span className="text-center">Tags</span>
    <span className="text-center">Component</span>
    <span className="text-center">From</span>
  </div>
);

const ScrollControls = ({ monthIndex, scrollContainerRefs }) => (
  <div className="sm:hidden flex items-center justify-between p-4 bg-neutral-900/70 border-t border-neutral-800/50 gap-2">
    <button
      onClick={() => {
        const container = scrollContainerRefs.current[monthIndex];
        if (container) container.scrollBy({ left: -300, behavior: "smooth" });
      }}
      className="p-2.5 rounded-lg bg-neutral-800/60 hover:bg-neutral-700/60 transition-all flex items-center gap-1 text-neutral-400 hover:text-white text-xs"
    >
      <ChevronLeft className="w-4 h-4" /> Left
    </button>
    <span className="text-xs text-neutral-500 font-medium px-4">Swipe →</span>
    <button
      onClick={() => {
        const container = scrollContainerRefs.current[monthIndex];
        if (container) container.scrollBy({ left: 300, behavior: "smooth" });
      }}
      className="p-2.5 rounded-lg bg-neutral-800/60 hover:bg-neutral-700/60 transition-all flex items-center gap-1 text-neutral-400 hover:text-white text-xs"
    >
      Right <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

const StatCard = ({ title, value, className = "" }) => (
  <div
    className={`p-6 bg-gradient-to-r from-neutral-500/10 to-neutral-600/10 border border-neutral-500/30 rounded-xl backdrop-blur-sm ${className}`}
  >
    <div className="flex items-center gap-3 mb-2">
      <span className="text-sm text-neutral-300 font-medium">{title}</span>
    </div>
    <p className="text-lg font-bold text-neutral-400">{value}</p>
  </div>
);

const LoadMoreButton = ({ hasMore, loadingMore, onLoadMore }) =>
  hasMore && (
    <div className="p-8 text-center border-t border-neutral-800/50 bg-neutral-900/50">
      <button
        onClick={onLoadMore}
        disabled={loadingMore}
        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingMore ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading more...
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Load 50 more transactions
          </>
        )}
      </button>
    </div>
  );

const TableHeader = () => (
  <div className="hidden sm:grid grid-cols-[minmax(200px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(120px,1.5fr)_minmax(100px,1fr)_minmax(100px,1fr)] items-center gap-4 p-6 border-b border-neutral-800/50 sticky top-0 z-30 shadow-lg bg-neutral-900/50">
    <div className="font-semibold text-neutral-300 text-left pl-1">
      Transaction
    </div>
    <div className="font-semibold text-neutral-300 text-center">Date</div>
    <div className="font-semibold text-neutral-300 text-right pr-4">Amount</div>
    <div className="font-semibold text-neutral-300 text-center">Tags</div>
    <div className="font-semibold text-neutral-300 text-center">Component</div>
    <div className="font-semibold text-neutral-300 text-center">From</div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [config, setConfig] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [displayTransactions, setDisplayTransactions] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState({});
  const scrollContainerRefs = useRef({});

  const { formatPrice, formatDate } = useFormat();

  const loadDashboardData = async (append = false) => {
    if (!append) {
      setLoading(true);
      setError("");
      setPage(1);
      setAllTransactions([]);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await api.get(
        `/dashboard?page=${page}&limit=50&sort=-date`
      );
      const newTransactions = response.data.transactions || [];
      setConfig(response.data.config);
      setHasMore(response.data.pagination?.hasMore || false);

      if (append) {
        setAllTransactions((prev) => [...prev, ...newTransactions]);
      } else {
        setAllTransactions(newTransactions);
      }
    } catch (e) {
      console.error("Dashboard load error:", e);
      setError(e.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const overallStats = useMemo(() => {
    return allTransactions.reduce(
      (acc, txn) => {
        const netAmount = txn.netAmount || 0;
        acc.count += 1;
        if (netAmount > 0) acc.income += netAmount;
        else acc.expense += Math.abs(netAmount);
        acc.net += netAmount;
        return acc;
      },
      { income: 0, expense: 0, net: 0, count: 0 }
    );
  }, [allTransactions]);

  const monthStats = useMemo(() => {
    const stats = {};
    Object.entries(displayTransactions).forEach(
      ([monthYear, monthTransactions]) => {
        stats[monthYear] = monthTransactions.reduce(
          (acc, txn) => {
            const netAmount = txn.netAmount || 0;
            acc.count += 1;
            if (netAmount > 0) acc.income += netAmount;
            else acc.expense += Math.abs(netAmount);
            acc.net += netAmount;
            return acc;
          },
          { income: 0, expense: 0, net: 0, count: 0 }
        );
      }
    );
    return stats;
  }, [displayTransactions]);

  useEffect(() => {
    if (allTransactions.length === 0) return;

    const grouped = {};
    allTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYearKey = date.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      });

      if (!grouped[monthYearKey]) grouped[monthYearKey] = [];
      grouped[monthYearKey].push(transaction);
    });

    const sortedMonths = Object.keys(grouped)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((result, month) => {
        result[month] = grouped[month];
        return result;
      }, {});

    const initialExpanded = Object.keys(sortedMonths).reduce((acc, month) => {
      acc[month] = true;
      return acc;
    }, {});

    setDisplayTransactions(sortedMonths);
    setExpandedMonths(initialExpanded);
  }, [allTransactions]);

  const toggleMonth = useCallback((monthKey) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [monthKey]: !prev[monthKey],
    }));
  }, []);

  const syncScroll = useCallback((scrollLeft, monthIndex) => {
    const ref = scrollContainerRefs.current[monthIndex];
    if (ref) ref.scrollLeft = scrollLeft;
  }, []);

  const handleScroll = useCallback(
    (e, monthIndex) => {
      syncScroll(e.target.scrollLeft, monthIndex);
    },
    [syncScroll]
  );

  const totalTransactions = useMemo(
    () => allTransactions.length,
    [allTransactions]
  );

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
    loadDashboardData(true);
  }, []);

  if (loading && page === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          <p className="text-orange-400 font-medium text-lg">
            Loading recent transactions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Transactions - {config?.name || "Dashboard"}</title>
      </Helmet>

      <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-col gap-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {config?.name || "Transactions Dashboard"}
            </h1>
            <p className="text-neutral-300 font-medium">
              Recent transactions (
              <span className="font-bold text-orange-400">
                {totalTransactions}
              </span>{" "}
              loaded)
            </p>
          </div>
        </div>

        {/* Dashboard Container */}
        <div className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden">
          {totalTransactions === 0 ? (
            <div className="text-center py-16">
              <DollarSign className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <p className="text-2xl font-bold text-neutral-400 mb-2">
                No transactions yet
              </p>
            </div>
          ) : (
            <>
              <TableHeader />

              {/* Monthly Groups */}
              {Object.entries(displayTransactions).map(
                ([monthYear, monthTransactions], monthIndex) => {
                  const stats = monthStats[monthYear];
                  const isExpanded = expandedMonths[monthYear];

                  return (
                    <div
                      key={monthYear}
                      className="border-b border-neutral-800/30 last:border-b-0"
                    >
                      <MonthHeader
                        monthYear={monthYear}
                        stats={stats}
                        isExpanded={isExpanded}
                        onToggle={() => toggleMonth(monthYear)}
                        count={stats.count}
                        formatPrice={formatPrice}
                      />

                      {isExpanded && (
                        <>
                          <MobileHeader />
                          <div
                            className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-700/70 scrollbar-track-neutral-900/50"
                            ref={(el) => {
                              if (el)
                                scrollContainerRefs.current[monthIndex] = el;
                            }}
                            onScroll={(e) => handleScroll(e, monthIndex)}
                          >
                            <div className="min-w-[950px]">
                              {monthTransactions.map((transaction, index) => (
                                <TransactionRow
                                  key={transaction._id}
                                  transaction={transaction}
                                  index={index}
                                  formatPrice={formatPrice}
                                  formatDate={formatDate}
                                />
                              ))}
                            </div>
                          </div>
                          <ScrollControls
                            monthIndex={monthIndex}
                            scrollContainerRefs={scrollContainerRefs}
                          />
                        </>
                      )}
                    </div>
                  );
                }
              )}

              <LoadMoreButton
                hasMore={hasMore}
                loadingMore={loadingMore}
                onLoadMore={handleLoadMore}
              />
            </>
          )}
        </div>

        {/* Overall Stats */}
        {totalTransactions > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Income"
              value={formatPrice(overallStats.income)}
            />
            <StatCard
              title="Total Expense"
              value={formatPrice(overallStats.expense)}
            />
            <StatCard
              title="Net Amount"
              value={formatPrice(overallStats.net)}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.3);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.7);
          border-radius: 4px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
      `}</style>
    </>
  );
};

export default Dashboard;
