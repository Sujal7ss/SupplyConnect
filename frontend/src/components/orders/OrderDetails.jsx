import React from 'react';
import { 
  MapPin, Package, Calendar, DollarSign, Truck, Clock,
  Info, AlertTriangle, CheckCircle, User
} from 'lucide-react';

const OrderDetails = ({ order }) => {
  if (!order) return null;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'in_progress':
        return <Truck className="h-5 w-5" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'cancelled':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Bids';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Order header with status */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{order.title}</h1>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-500 mr-4">Order #{order.id.substring(6)}</span>
              <span className="text-sm text-gray-500">Created: {formatDate(order.createdAt)}</span>
            </div>
          </div>
          
          <div className={`flex items-center px-3 py-1.5 rounded-full mt-4 md:mt-0 ${getStatusClass(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="ml-2 font-medium">{getStatusText(order.status)}</span>
          </div>
        </div>
        
        <p className="mt-4 text-gray-700">{order.description}</p>
      </div>
      
      {/* Locations */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-lg font-semibold mb-4">Locations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup Location */}
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-700">Pickup Location</h3>
              <p className="text-sm text-gray-900">{order.pickupLocation.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                Expected: {formatDate(order.expectedPickupDate)}
              </p>
            </div>
          </div>
          
          {/* Delivery Location */}
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 bg-green-50 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-700">Delivery Location</h3>
              <p className="text-sm text-gray-900">{order.deliveryLocation.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                Expected: {formatDate(order.expectedDeliveryDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shipment Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-lg font-semibold mb-4">Shipment Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex">
            <Package className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <h3 className="text-xs text-gray-500">Total Weight</h3>
              <p className="text-sm font-medium">{order.weight}</p>
            </div>
          </div>
          
          <div className="flex">
            <Truck className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <h3 className="text-xs text-gray-500">Dimensions</h3>
              <p className="text-sm font-medium">{order.dimensions}</p>
            </div>
          </div>
          
          <div className="flex">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <h3 className="text-xs text-gray-500">Budget</h3>
              <p className="text-sm font-medium">${order.budget}</p>
            </div>
          </div>
        </div>
        
        {/* Items list */}
        <h3 className="text-md font-medium mb-3">Items ({order.items.length})</h3>
        <div className="bg-gray-50 rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.weight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Driver Information (if assigned) */}
      {order.assignedDriverId && (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-semibold mb-4">Driver Information</h2>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium">John Driver</h3>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="text-xs ml-1">4.5 (32 reviews)</span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center text-sm">
                  <Truck className="h-4 w-4 text-gray-400 mr-1" />
                  <span>Truck (5 tons)</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span>Chicago, IL</span>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-sm btn-outline">
                  Contact Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;