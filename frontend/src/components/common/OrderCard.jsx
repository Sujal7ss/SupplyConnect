import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, DollarSign, Package, Truck } from 'lucide-react';

const OrderCard = ({ order, userType = 'supplier', showActions = true, showStatus = true }) => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
  
  const linkPath = userType === 'supplier' 
    ? `/supplier/orders/${order.id}`
    : `/driver/orders/${order.id}`;

  return (
    <div className="card overflow-hidden hover:shadow-md transition-all">
      {/* Header with status */}
      {showStatus && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusClass(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          <span className="text-xs text-gray-500">Order #{order.id.substring(6)}</span>
        </div>
      )}
      
      {/* Card Body */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{order.title}</h3>
        
        <div className="space-y-2">
          {/* Pickup location */}
          <div className="flex items-start text-sm">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Pickup</p>
              <p className="text-gray-700">{order.pickupLocation.address}</p>
            </div>
          </div>
          
          {/* Delivery location */}
          <div className="flex items-start text-sm">
            <MapPin className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Delivery</p>
              <p className="text-gray-700">{order.deliveryLocation.address}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            {/* Dates */}
            <div className="flex items-center text-xs text-gray-600">
              <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{formatDate(order.expectedPickupDate)}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-600">
              <Clock className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{order.items.length} items</span>
            </div>
            
            {/* Budget */}
            <div className="flex items-center text-xs text-gray-600">
              <DollarSign className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>${order.budget}</span>
            </div>
            
            {/* Weight */}
            <div className="flex items-center text-xs text-gray-600">
              <Package className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{order.weight}</span>
            </div>
          </div>
        </div>
        
        {/* Bids count for suppliers or driver info for in-progress orders */}
        {userType === 'supplier' && order.status === 'pending' && (
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {order.bids.length} {order.bids.length === 1 ? 'bid' : 'bids'}
            </span>
          </div>
        )}
        
        {userType === 'supplier' && order.status === 'in_progress' && order.assignedDriverId && (
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <Truck className="h-4 w-4 mr-1 text-blue-600" />
            <span>Driver: John Driver</span>
          </div>
        )}
        
        {/* Action buttons */}
        {showActions && (
          <div className="mt-4 flex justify-end">
            <Link 
              to={linkPath}
              className="btn btn-sm btn-primary"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;