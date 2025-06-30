import React from 'react';
import { 
  Truck, Package, CheckCircle, Clock, ArrowRight, CircleDot
} from 'lucide-react';

const TrackingTimeline = ({ trackingHistory = [] }) => {
  if (!trackingHistory || trackingHistory.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-500">No tracking information available yet.</p>
      </div>
    );
  }

  // Sort tracking events by timestamp (newest first)
  const sortedHistory = [...trackingHistory].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-amber-500" />;
      case 'picked_up':
        return <Package className="h-6 w-6 text-blue-500" />;
      case 'in_transit':
        return <Truck className="h-6 w-6 text-blue-600" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <CircleDot className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'picked_up':
        return 'Picked Up';
      case 'in_transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Tracking Timeline</h3>
      
      <div className="space-y-8">
        {sortedHistory.map((event, index) => (
          <div key={index} className="relative">
            {/* Timeline connector line */}
            {index < sortedHistory.length - 1 && (
              <div className="absolute top-6 left-3 w-0.5 h-10 bg-gray-200"></div>
            )}
            
            <div className="flex">
              {/* Status icon */}
              <div className="flex-shrink-0 z-10">
                {getStatusIcon(event.status)}
              </div>
              
              {/* Event details */}
              <div className="ml-4">
                <h4 className="text-md font-medium">{getStatusText(event.status)}</h4>
                <time className="block text-sm text-gray-500 mb-1">
                  {formatDateTime(event.timestamp)}
                </time>
                
                {event.location && (
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <ArrowRight className="h-3.5 w-3.5 mr-1" />
                    <span>{event.location.address}</span>
                  </div>
                )}
                
                {event.notes && (
                  <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {event.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingTimeline;