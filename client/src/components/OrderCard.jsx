import React from 'react';

const OrderCard = ({ order }) => {
    const { startLocation, endLocation, weight, vehicleType, price } = order;

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-300">
            <div className="flex flex-col mb-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-800 font-semibold text-base">{startLocation}</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    <span className="text-gray-800 font-semibold text-base">{endLocation}</span>
                </div>
                <div className="flex flex-row justify-between gap-2">
                    <div className="flex-1 p-2 bg-gray-100 rounded-md border border-gray-300 text-center">
                        <span className="text-gray-800">{weight} kg</span>
                    </div>
                    <div className="flex-1 p-2 bg-gray-100 rounded-md border border-gray-300 text-center">
                        <span className="text-gray-800">{vehicleType}</span>
                    </div>
                    <div className="flex-1 p-2 bg-gray-100 rounded-md border border-gray-300 text-center">
                        <span className="text-gray-800">${price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
