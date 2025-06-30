import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import OrderForm from '../../components/orders/OrderForm';
import { useMapp } from '../../contexts/MapContext'; // ⬅️ Import context hook

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⬇️ Use values from map context
  const {
    distance,
    duration,
    startAddress,
    endAddress,
    firstMarker,
    secondMarker,
  } = useMapp();

  const handleSubmit = async (orderData) => {
    if (!startAddress || !endAddress || !firstMarker || !secondMarker) {
      alert("Please select pickup and delivery locations on the map.");
      return;
    }

    const pickupLngLat = firstMarker.getLngLat();
    const deliveryLngLat = secondMarker.getLngLat();

    const finalOrderData = {
      ...orderData,
      pickupAddress: startAddress,
      deliveryAddress: endAddress,
      distance,
      duration,
      pickupCoordinates: {
        lat: pickupLngLat.lat,
        lng: pickupLngLat.lng,
      },
      deliveryCoordinates: {
        lat: deliveryLngLat.lat,
        lng: deliveryLngLat.lng,
      },
    };

    // setIsSubmitting(true);
    console.log("finalOrderData", finalOrderData)
    // Simulate/replace with real API call
    // setTimeout(() => {
    //   navigate('/supplier', {
    //     state: {
    //       notification: {
    //         type: 'success',
    //         message: 'Order created successfully!',
    //       },
    //     },
    //   });
    // }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </button>

              <h1 className="text-2xl font-bold">Create New Order</h1>
              <p className="text-gray-600 mt-1">
                Fill in the details below to create a new delivery order.
              </p>
            </div>

            <OrderForm onSubmit={handleSubmit} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateOrderPage;
