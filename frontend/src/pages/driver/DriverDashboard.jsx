import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TruckIcon, DollarSign, Package, 
  Filter, ArrowDownUp, Search, CheckCircle, MapPin
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import OrderCard from '../../components/common/OrderCard';
import Map from '../../components/common/Map';
import Loader from '../../components/common/Loader';
import { mockOrders, mockAvailableOrders } from '../../data/mockData';

const DriverDashboard = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    // Simulate API call to fetch orders
    setTimeout(() => {
      // Filter orders for this driver (assigned to driver-1)
      const driverOrders = mockOrders.filter(
        order => order.assignedDriverId === 'driver-1' || 
                 order.bids.some(bid => bid.driverId === 'driver-1')
      );
      
      setActiveOrders(driverOrders);
      setAvailableOrders(mockAvailableOrders);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter active orders based on status and search query
  const filteredActiveOrders = activeOrders.filter(order => {
    // Filter by status if not "all"
    if (filterStatus !== 'all' && order.status !== filterStatus) {
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
  
  // Filter available orders by search query only
  const filteredAvailableOrders = availableOrders.filter(order => {
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
  const sortOrders = (orders) => {
    return [...orders].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'budget_high':
          return b.budget - a.budget;
        case 'budget_low':
          return a.budget - b.budget;
        case 'pickup_date':
          return new Date(a.expectedPickupDate) - new Date(b.expectedPickupDate);
        default:
          return 0;
      }
    });
  };
  
  const sortedActiveOrders = sortOrders(filteredActiveOrders);
  const sortedAvailableOrders = sortOrders(filteredAvailableOrders);
  
  // Generate counts for each status in active orders
  const orderCounts = {
    all: activeOrders.length,
    pending: activeOrders.filter(order => order.status === 'pending').length,
    in_progress: activeOrders.filter(order => order.status === 'in_progress').length,
    completed: activeOrders.filter(order => order.status === 'completed').length,
  };
  
  // Stats
  const stats = [
    {
      title: 'Active Deliveries',
      value: orderCounts.in_progress,
      icon: <TruckIcon className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Completed Deliveries',
      value: orderCounts.completed,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Earnings',
      value: '$1,850',
      icon: <DollarSign className="h-5 w-5 text-amber-600" />,
      color: 'bg-amber-50'
    },
    {
      title: 'This Month',
      value: '+20%',
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      color: 'bg-purple-50'
    }
  ];
  
  // Map locations for active orders
  const activeOrderLocations = activeOrders
    .filter(order => order.status === 'in_progress')
    .flatMap(order => [
      order.pickupLocation,
      order.deliveryLocation
    ]);
    
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
            <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>
            
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
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 text-sm font-medium -mb-px ${
                      activeTab === 'active'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    My Orders ({activeOrders.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('available')}
                    className={`px-4 py-2 text-sm font-medium -mb-px ${
                      activeTab === 'available'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Available Orders ({availableOrders.length})
                  </button>
                </div>
                
                {/* Filters (only show for active tab) */}
                {activeTab === 'active' && (
                  <div className="pt-4">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                      {/* Status filter */}
                      <div className="flex items-center space-x-2">
                        <Filter className="h-5 w-5 text-gray-500" />
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setFilterStatus('all')}
                            className={`px-3 py-1 text-sm rounded-md ${
                              filterStatus === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            All ({orderCounts.all})
                          </button>
                          <button
                            onClick={() => setFilterStatus('pending')}
                            className={`px-3 py-1 text-sm rounded-md ${
                              filterStatus === 'pending'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Pending ({orderCounts.pending})
                          </button>
                          <button
                            onClick={() => setFilterStatus('in_progress')}
                            className={`px-3 py-1 text-sm rounded-md ${
                              filterStatus === 'in_progress'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            In Progress ({orderCounts.in_progress})
                          </button>
                          <button
                            onClick={() => setFilterStatus('completed')}
                            className={`px-3 py-1 text-sm rounded-md ${
                              filterStatus === 'completed'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  </div>
                )}
                
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
                <h2 className="text-xl font-semibold">
                  {activeTab === 'active' ? 'My Orders' : 'Available Orders'}
                </h2>
                
                {activeTab === 'active' ? (
                  sortedActiveOrders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <Package className="h-16 w-16 text-gray-300" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No orders found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery 
                          ? 'No orders match your search criteria. Try different keywords.'
                          : `You don't have any ${filterStatus !== 'all' ? filterStatus : ''} orders yet.`}
                      </p>
                      {!searchQuery && filterStatus !== 'all' && (
                        <button
                          onClick={() => setFilterStatus('all')}
                          className="btn btn-sm btn-outline"
                        >
                          View All Orders
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {sortedActiveOrders.map((order) => (
                        <OrderCard key={order.id} order={order} userType="driver" />
                      ))}
                    </div>
                  )
                ) : (
                  sortedAvailableOrders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <Package className="h-16 w-16 text-gray-300" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No available orders</h3>
                      <p className="text-gray-500">
                        {searchQuery 
                          ? 'No orders match your search criteria. Try different keywords.'
                          : 'There are no available orders at the moment. Check back later.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {sortedAvailableOrders.map((order) => (
                        <OrderCard key={order.id} order={order} userType="driver" />
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-3">Active Deliveries</h2>
                <Map 
                  locations={activeOrderLocations}
                  route={true}
                  height="300px"
                  showCurrentLocation={true}
                />
              </div>
              
              {/* Closest Orders */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Nearby Opportunities</h2>
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                
                <div className="space-y-3">
                  {availableOrders.slice(0, 3).map(order => (
                    <div key={order.id} className="flex items-start p-3 bg-gray-50 rounded-md">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                        <DollarSign className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{order.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{order.pickupLocation.address}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs font-semibold text-blue-600">${order.budget}</span>
                          <span className="text-xs text-gray-500 ml-2">~25 miles away</span>
                        </div>
                      </div>
                    </div>
                  ))}
                    
                  {availableOrders.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No nearby orders available</p>
                  )}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-3">Performance</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">On-time Deliveries</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Response Time</span>
                    <span className="font-medium">1.2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Acceptance Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm font-medium">4.5</span>
                    </div>
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

export default DriverDashboard;