import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Star, Truck, 
  Camera, Edit2, Shield, CheckCircle2
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/common/Loader';
import { mockReviews } from '../data/mockData';

const ProfilePage = ({ userType = 'supplier' }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Simulate API call to fetch user profile data
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-muted">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-400 relative">
              <button className="absolute right-4 bottom-4 btn btn-sm bg-white text-gray-700 hover:bg-gray-100 flex items-center">
                <Camera className="h-4 w-4 mr-1" />
                <span>Change Cover</span>
              </button>
            </div>
            
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start">
                {/* Profile Picture */}
                <div className="relative -mt-16 mb-4 md:mb-0">
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center overflow-hidden">
                    {currentUser.profileImage ? (
                      <img 
                        src={currentUser.profileImage} 
                        alt={currentUser.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-blue-600" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Profile Info */}
                <div className="md:ml-6 md:mt-4 flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                      <p className="text-gray-600 capitalize">{currentUser.role}</p>
                    </div>
                    
                    <button className="mt-4 md:mt-0 btn btn-outline flex items-center">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{currentUser.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{currentUser.phone || '(555) 123-4567'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{currentUser.address || 'New York, NY'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Joined {new Date(currentUser.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(currentUser.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-700 font-medium">{currentUser.rating}</span>
                    <span className="ml-1 text-gray-500">({currentUser.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      {/* About */}
                      <div>
                        <h2 className="text-lg font-semibold mb-3">About</h2>
                        <p className="text-gray-700">
                          {userType === 'supplier' ? (
                            <>
                              ABC Suppliers is a leading distributor of electronics and consumer goods with over 10 years of experience in the industry. We specialize in timely and reliable delivery of high-quality products to retailers across the country.
                            </>
                          ) : (
                            <>
                              Professional driver with 8+ years of experience in logistics and transportation. Specialized in handling fragile and time-sensitive deliveries. Clean driving record and committed to on-time delivery with excellent customer service.
                            </>
                          )}
                        </p>
                      </div>
                      
                      {/* Driver-specific information */}
                      {userType === 'driver' && (
                        <div>
                          <h2 className="text-lg font-semibold mb-3">Vehicle Information</h2>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center">
                                <Truck className="h-5 w-5 text-gray-500 mr-3" />
                                <div>
                                  <p className="text-sm text-gray-500">Vehicle Type</p>
                                  <p className="font-medium">Commercial Truck</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Package className="h-5 w-5 text-gray-500 mr-3" />
                                <div>
                                  <p className="text-sm text-gray-500">Capacity</p>
                                  <p className="font-medium">5 tons</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Shield className="h-5 w-5 text-gray-500 mr-3" />
                                <div>
                                  <p className="text-sm text-gray-500">License</p>
                                  <p className="font-medium">TRK-4567</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                                <div>
                                  <p className="text-sm text-gray-500">Insurance</p>
                                  <p className="font-medium">Valid until Dec 2023</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div>
                        <h2 className="text-lg font-semibold mb-3">
                          {userType === 'supplier' ? 'Shipping Statistics' : 'Delivery Statistics'}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-blue-600">42</p>
                            <p className="text-sm text-gray-600">Total Orders</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-green-600">98%</p>
                            <p className="text-sm text-gray-600">On-time Delivery</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-amber-600">4.8</p>
                            <p className="text-sm text-gray-600">Avg. Rating</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-purple-600">24</p>
                            <p className="text-sm text-gray-600">Reviews</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recent Reviews */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Recent Reviews</h2>
                        <button
                          onClick={() => setActiveTab('reviews')}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          View All
                        </button>
                      </div>
                      
                      {reviews.length > 0 ? (
                        <div className="space-y-4">
                          {reviews.slice(0, 2).map(review => (
                            <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                              <p className="text-xs text-gray-500">
                                Order #{review.orderId.substring(6)}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-6">No reviews yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-6 w-6 ${i < Math.floor(currentUser.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <div>
                      <span className="text-2xl font-bold">{currentUser.rating}</span>
                      <span className="text-gray-500 ml-1">out of 5</span>
                    </div>
                    <span className="text-gray-500 ml-4">Based on {currentUser.reviewCount} reviews</span>
                  </div>
                  
                  {/* Reviews list */}
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map(review => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  {review.reviewerId === 'supplier-1' ? 'ABC Suppliers' : 'John Driver'}
                                </h3>
                                <div className="flex items-center mt-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500 ml-2">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">
                              Order #{review.orderId.substring(6)}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-3">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Star className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No reviews yet</h3>
                        <p className="text-gray-500">
                          Once you complete orders, your reviews will appear here.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Info */}
                      <div>
                        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              {userType === 'supplier' ? 'Company Name' : 'Full Name'}
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="input"
                              defaultValue={currentUser.name}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="input"
                              defaultValue={currentUser.email}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              className="input"
                              defaultValue={currentUser.phone || '(555) 123-4567'}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                              Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              className="input"
                              defaultValue={currentUser.address || 'New York, NY'}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Account Settings */}
                      <div>
                        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <input
                              type="password"
                              id="currentPassword"
                              className="input"
                              placeholder="••••••••"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input
                              type="password"
                              id="newPassword"
                              className="input"
                              placeholder="••••••••"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              className="input"
                              placeholder="••••••••"
                            />
                          </div>
                          
                          {userType === 'driver' && (
                            <div>
                              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                                Vehicle Type
                              </label>
                              <select id="vehicleType" className="input">
                                <option>Commercial Truck</option>
                                <option>Van</option>
                                <option>Pickup Truck</option>
                                <option>Car</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Notification Preferences */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                            <p className="text-xs text-gray-500">Receive notifications about orders via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700">SMS Notifications</h3>
                            <p className="text-xs text-gray-500">Receive notifications about orders via SMS</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700">Push Notifications</h3>
                            <p className="text-xs text-gray-500">Receive notifications about orders via push notifications</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button type="button" className="btn btn-outline">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;