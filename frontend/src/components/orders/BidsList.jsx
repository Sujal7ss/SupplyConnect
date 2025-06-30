import React from 'react';
import { User, Clock, CheckCircle, XCircle } from 'lucide-react';

const BidsList = ({ bids, onAcceptBid, orderId }) => {
  if (!bids || bids.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No bids have been placed on this order yet.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Bids ({bids.length})</h3>
      
      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">John Driver</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-xs ml-1">4.5 (32 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">${bid.amount}</span>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{formatDate(bid.createdAt)}</span>
                </div>
              </div>
            </div>
            
            {bid.message && (
              <div className="mt-3 px-3 py-2 bg-gray-50 rounded-md text-sm text-gray-700">
                {bid.message}
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span>Delivery by: {formatDate(bid.estimatedDeliveryDate)}</span>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => onAcceptBid(orderId, bid.id)}
                  className="btn btn-sm btn-primary flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept Bid
                </button>
                <button className="btn btn-sm btn-outline flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidsList;