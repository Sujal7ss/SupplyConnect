import React from 'react';
import OrderCard from '../components/OrderCard.jsx';

const dummy = {
    startLocation: "123 Main St, Cityville",
    endLocation: "456 Elm St, Townsville",
    weight: 120,
    vehicleType: "Van",
    price: 150.0,
};


const OrderList = () => {
    return (
        <div className="flex flex-col overflow-y-auto space-y-4 p-4 h-screen">
            <OrderCard key={1} order={dummy} />
            <OrderCard key={2} order={dummy} />
            <OrderCard key={3} order={dummy} />
            {/* <h1 className="text-2xl font-bold mb-6">Orders List</h1>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders available.</p>
            ) : (
                <div className="space-y-4 flex flex-col">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default OrderList;

