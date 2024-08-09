import React from 'react';

const OrderCard = ({ order }) => {
    const { startLocation, endLocation, weight, vehicleType, price } = order;

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-300">
            <div className="flex items-center mb-4">
                <div className="flex flex-col items-center w-full">
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-gray-800 font-medium">{startLocation}</span>
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                        <span className="text-gray-800 font-medium">{endLocation}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-sm">
                <div className="flex flex-col items-center flex-1">
                    <span className="font-medium text-gray-600">Weight:</span>
                    <span className="text-gray-800">{weight} kg</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <span className="font-medium text-gray-600">Vehicle Type:</span>
                    <span className="text-gray-800">{vehicleType}</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <span className="font-medium text-gray-600">Price:</span>
                    <span className="text-gray-800">${price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
