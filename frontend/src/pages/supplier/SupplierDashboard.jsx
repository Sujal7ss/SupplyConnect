import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  TrendingUp,
  TruckIcon,
  DollarSign,
  PackageCheck,
  Filter,
  ArrowDownUp,
  Search,
  Calendar,
  Package
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import OrderCard from "../../components/common/OrderCard";
import Map from "../../components/common/Map";
import { mockOrders } from "../../data/mockData";
import Loader from "../../components/common/Loader";

const SupplierDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Simulate API call to fetch orders
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter orders based on status and search query
  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.title.toLowerCase().includes(query) ||
        order.description.toLowerCase().includes(query) ||
        order.pickupLocation.address.toLowerCase().includes(query) ||
        order.deliveryLocation.address.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "budget_high":
        return b.budget - a.budget;
      case "budget_low":
        return a.budget - b.budget;
      case "pickup_date":
        return new Date(a.expectedPickupDate) - new Date(b.expectedPickupDate);
      default:
        return 0;
    }
  });

  // Generate counts for each status
  const orderCounts = {
    all: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    in_progress: orders.filter((order) => order.status === "in_progress")
      .length,
    completed: orders.filter((order) => order.status === "completed").length,
  };

  // Stats
  const stats = [
    {
      title: "Active Orders",
      value: orderCounts.pending + orderCounts.in_progress,
      icon: <TruckIcon className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "Completed Orders",
      value: orderCounts.completed,
      icon: <PackageCheck className="h-5 w-5 text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "Total Spent",
      value: "$2,450",
      icon: <DollarSign className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-50",
    },
    {
      title: "This Month",
      value: "+15%",
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-50",
    },
  ];

  // Map locations for active orders
  const activeOrderLocations = orders
    .filter((order) => order.status === "in_progress")
    .flatMap((order) => [order.pickupLocation, order.deliveryLocation]);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-muted">
        <div className="container mx-auto px-4 py-8">
          {/* Header with stats */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">
                Supplier Dashboard
              </h1>

              <Link
                to="/supplier/create-order"
                className="btn btn-primary flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Order
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-5">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-full mr-4`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                  {/* Status filter */}
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setFilterStatus("all")}
                        className={`px-3 py-1 text-sm rounded-md ${
                          filterStatus === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All ({orderCounts.all})
                      </button>
                      <button
                        onClick={() => setFilterStatus("pending")}
                        className={`px-3 py-1 text-sm rounded-md ${
                          filterStatus === "pending"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Pending ({orderCounts.pending})
                      </button>
                      <button
                        onClick={() => setFilterStatus("in_progress")}
                        className={`px-3 py-1 text-sm rounded-md ${
                          filterStatus === "in_progress"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        In Progress ({orderCounts.in_progress})
                      </button>
                      <button
                        onClick={() => setFilterStatus("completed")}
                        className={`px-3 py-1 text-sm rounded-md ${
                          filterStatus === "completed"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Completed ({orderCounts.completed})
                      </button>
                    </div>
                  </div>

                  {/* Sort options */}
                  <div className="flex items-center">
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-gray-100 text-gray-700 py-1 pl-8 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="budget_high">Budget: High to Low</option>
                        <option value="budget_low">Budget: Low to High</option>
                        <option value="pickup_date">Pickup Date</option>
                      </select>
                      <ArrowDownUp className="h-4 w-4 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Search bar */}
                <div className="mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search orders by title, description, or location"
                      className="input pl-10 pr-4 py-2 w-full"
                    />
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Orders</h2>

                {sortedOrders.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <Package className="h-16 w-16 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No orders found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery
                        ? "No orders match your search criteria. Try different keywords."
                        : `You don't have any ${
                            filterStatus !== "all" ? filterStatus : ""
                          } orders yet.`}
                    </p>
                    {!searchQuery && filterStatus !== "all" && (
                      <button
                        onClick={() => setFilterStatus("all")}
                        className="btn btn-sm btn-outline"
                      >
                        View All Orders
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {sortedOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        userType="supplier"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-3">
                  Active Deliveries
                </h2>
                <Map
                  locations={activeOrderLocations}
                  route={true}
                  height="300px"
                />
              </div>

              {/* Calendar */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Upcoming Pickups</h2>
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>

                <div className="space-y-3">
                  {orders
                    .filter(
                      (order) =>
                        order.status === "pending" ||
                        order.status === "in_progress"
                    )
                    .slice(0, 3)
                    .map((order) => (
                      <div
                        key={order.id}
                        className="flex items-start p-3 bg-gray-50 rounded-md"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                          <span className="text-blue-700 font-medium">
                            {new Date(order.expectedPickupDate).getDate()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{order.title}</h3>
                          <p className="text-xs text-gray-500">
                            {new Date(
                              order.expectedPickupDate
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}

                  {orders.filter(
                    (order) =>
                      order.status === "pending" ||
                      order.status === "in_progress"
                  ).length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      No upcoming pickups
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-3">Overview</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Orders</span>
                    <span className="font-medium">{orders.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Avg. Delivery Time
                    </span>
                    <span className="font-medium">1.8 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      On-time Delivery
                    </span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Avg. Cost per Order
                    </span>
                    <span className="font-medium">$816</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupplierDashboard;
