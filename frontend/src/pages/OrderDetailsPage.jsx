import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Share2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import OrderDetails from '../components/orders/OrderDetails';
import Map from '../components/common/Map';
import BidsList from '../components/orders/BidsList';
import BidForm from '../components/orders/BidForm';
import TrackingTimeline from '../components/orders/TrackingTimeline';
import Loader from '../components/common/Loader';
import { mockOrders, mockAvailableOrders } from '../data/mockData';

const OrderDetailsPage = ({ userType = 'supplier' }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate API call to fetch order details
    setTimeout(() => {
      // Find order in both mock orders and available orders
      const foundOrder = [...mockOrders, ...mockAvailableOrders].find(
        (order) => order.id === orderId
      );
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found');
      }
      
      setLoading(false);
    }, 1000);
  }, [orderId]);
  
  const handleSubmitBid = (bidData) => {
    // Simulate submitting a bid
    const newBid = {
      id: `bid-${Date.now()}`,
      driverId: 'driver-1',
      ...bidData,
      createdAt: new Date().toISOString(),
    };
    
    // Update order with new bid
    setOrder({
      ...order,
      bids: [...order.bids, newBid],
    });
  };
  
  const handleAcceptBid = (orderId, bidId) => {
    // Simulate accepting a bid
    setOrder({
      ...order,
      status: 'in_progress',
      assignedDriverId: 'driver-1',
      trackingHistory: [
        {
          status: 'picked_up',
          location: {
            coordinates: order.pickupLocation.coordinates,
            address: order.pickupLocation.address
          },
          timestamp: new Date().toISOString()
        }
      ]
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Order Not Found</h2>
            <p className="text-gray-500 mb-4">The order you're looking for doesn't exist or you don't have access to it.</p>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-primary"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get map locations
  const mapLocations = [
    order.pickupLocation,
    order.deliveryLocation
  ];
  
  // Check if order is active (has tracking history)
  const isActive = order.status === 'in_progress' && order.trackingHistory.length > 0;
  
  // Determine if current user is allowed to bid
  const canBid = userType === 'driver' && order.status === 'pending' && !order.bids.some(bid => bid.driverId === 'driver-1');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <OrderDetails order={order} />
              
              {/* Tracking timeline for in-progress orders */}
              {isActive && (
                <div className="mt-8">
                  <TrackingTimeline trackingHistory={order.trackingHistory} />
                </div>
              )}
              
              {/* Map section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Delivery Route</h2>
                <Map 
                  locations={mapLocations}
                  route={true}
                  height="400px"
                  showCurrentLocation={isActive}
                />
              </div>
              
              {/* Bids section (for suppliers with pending orders) */}
              {userType === 'supplier' && order.status === 'pending' && (
                <div className="mt-8">
                  <BidsList 
                    bids={order.bids} 
                    onAcceptBid={handleAcceptBid}
                    orderId={order.id}
                  />
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Action buttons */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="space-y-3">
                  <button className="btn w-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span>Contact {userType === 'supplier' ? 'Driver' : 'Supplier'}</span>
                  </button>
                  
                  <button className="btn btn-outline w-full flex items-center justify-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    <span>Share Order</span>
                  </button>
                </div>
              </div>
              
              {/* Place bid section (for drivers on pending orders) */}
              {canBid && (
                <div className="mb-6">
                  <BidForm order={order} onSubmitBid={handleSubmitBid} />
                </div>
              )}
              
              {/* Order summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{order.id.substring(6)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">{order.status.replace('_', ' ')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">${order.budget}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-medium">{order.items.length}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">245 miles</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Travel Time:</span>
                    <span className="font-medium">4.5 hours</span>
                  </div>
                </div>
                
                <hr className="my-4 border-gray-200" />
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Payment</span>
                  <span className="text-xl font-bold text-blue-600">${order.budget}</span>
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

export default OrderDetailsPage;