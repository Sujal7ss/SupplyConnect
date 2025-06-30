import React, { useState } from 'react';
import { CalendarClock, DollarSign } from 'lucide-react';

const BidForm = ({ order, onSubmitBid }) => {
  const [amount, setAmount] = useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid bid amount';
    }
    
    if (!estimatedDeliveryDate) {
      newErrors.estimatedDeliveryDate = 'Please select an estimated delivery date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Create bid object
    const bidData = {
      amount: Number(amount),
      estimatedDeliveryDate: new Date(estimatedDeliveryDate).toISOString(),
      message: message.trim(),
    };
    
    // Simulate API call
    setTimeout(() => {
      onSubmitBid(bidData);
      setIsSubmitting(false);
      setAmount('');
      setEstimatedDeliveryDate('');
      setMessage('');
    }, 1000);
  };
  
  // Calculate minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Place Your Bid</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Bid Amount ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="amount"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`input pl-10 ${errors.amount ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              placeholder="Enter your bid amount"
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          <p className="mt-1 text-xs text-gray-500">Customer's budget: ${order.budget}</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="estimatedDeliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Delivery Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarClock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="estimatedDeliveryDate"
              min={today}
              value={estimatedDeliveryDate}
              onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
              className={`input pl-10 ${errors.estimatedDeliveryDate ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
          </div>
          {errors.estimatedDeliveryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedDeliveryDate}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Expected delivery date: {new Date(order.expectedDeliveryDate).toLocaleDateString()}
          </p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input"
            placeholder="Why should the supplier choose you? Highlight your experience, vehicle details, etc."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Bid'}
        </button>
      </form>
    </div>
  );
};

export default BidForm;