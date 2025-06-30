import React, { useState } from "react";
import {
  Route,
  Clock,
  Package,
  Calendar,
  DollarSign,
  Truck,
} from "lucide-react";
import { useMapp } from "../../contexts/MapContext";

const OrderForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "Electronics Delivery",
    description: "Deliver 5 electronic items safely to client.",
    pickupAddress: "123 Startup Lane, Bengaluru",
    deliveryAddress: "456 Market Street, Mumbai",
    items: [
      { name: "Laptop", quantity: "2", weight: "2.5" },
      { name: "Monitor", quantity: "3", weight: "5" },
    ],
    totalWeight: "17.5", // total of all items
    dimensions: "100x50x50 cm",
    expectedPickupDate: "2025-07-01",
    expectedDeliveryDate: "2025-07-03",
    budget: "5000",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    suggestionsRef,
    startboxref,
    endboxref,
    handleSearchInputChange,
    handlesuggestionstart,
    handlesuggestionend,
    autocompleteResults,
    mapContainer,
    activeInput,
    drawRoute,
    distance,
    duration,
  } = useMapp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index] = { ...items[index], [name]: value };
    setFormData({ ...formData, items });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: "", weight: "" }],
    });
  };

  const removeItem = (index) => {
    const items = [...formData.items];
    items.splice(index, 1);
    setFormData({ ...formData, items });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.pickupAddress.trim())
      newErrors.pickupAddress = "Pickup address is required";
    if (!formData.deliveryAddress.trim())
      newErrors.deliveryAddress = "Delivery address is required";

    // Validate items
    const itemsErrors = [];
    formData.items.forEach((item, index) => {
      const itemError = {};
      if (!item.name.trim()) itemError.name = "Item name is required";
      if (
        !item.quantity.trim() ||
        isNaN(item.quantity) ||
        Number(item.quantity) <= 0
      ) {
        itemError.quantity = "Valid quantity is required";
      }
      if (!item.weight.trim()) itemError.weight = "Weight is required";

      if (Object.keys(itemError).length > 0) {
        itemsErrors[index] = itemError;
      }
    });

    if (itemsErrors.length > 0) newErrors.items = itemsErrors;

    if (!formData.totalWeight.trim())
      newErrors.totalWeight = "Total weight is required";
    if (!formData.dimensions.trim())
      newErrors.dimensions = "Dimensions are required";
    if (!formData.expectedPickupDate)
      newErrors.expectedPickupDate = "Pickup date is required";
    if (!formData.expectedDeliveryDate)
      newErrors.expectedDeliveryDate = "Delivery date is required";

    if (formData.expectedPickupDate && formData.expectedDeliveryDate) {
      const pickupDate = new Date(formData.expectedPickupDate);
      const deliveryDate = new Date(formData.expectedDeliveryDate);

      if (pickupDate > deliveryDate) {
        newErrors.expectedDeliveryDate =
          "Delivery date must be after pickup date";
      }
    }

    if (
      !formData.budget.trim() ||
      isNaN(formData.budget) ||
      Number(formData.budget) <= 0
    ) {
      newErrors.budget = "Valid budget is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Format data for submission
    const orderData = {
      ...formData,
      items: formData.items.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
      })),
      budget: Number(formData.budget),
      expectedPickupDate: new Date(formData.expectedPickupDate).toISOString(),
      expectedDeliveryDate: new Date(
        formData.expectedDeliveryDate
      ).toISOString(),
    };

    // Simulate API call
    setTimeout(() => {
      onSubmit(orderData);
      setIsSubmitting(false);
    }, 1000);
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>

        <div className="grid grid-cols-1 gap-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Order Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input w-2xl h-10 p-1 ${
                errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              placeholder="E.g., Electronics Delivery to Boston"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className={`input w-2xl h-10 p-1 ${
                errors.description
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
              placeholder="Provide details about your shipment"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5 relative w-full">
        <h2 className="text-xl font-semibold mb-4">Select Locations on Map</h2>

        {/* Map Search Form */}
        <div className="flex flex-col space-y-2">
          {/* Pickup Input */}
          <input
            type="search"
            id="start_location"
            ref={startboxref}
            onChange={handleSearchInputChange}
            className="p-3 ps-3 text-sm text-gray-800 rounded-lg bg-white border border-gray-300 focus:outline-none placeholder-gray-500"
            placeholder="Pickup Location"
            autoComplete="off"
            required
          />

          {/* Dropoff Input with Submit */}
          <div className="flex items-center space-x-2">
            <input
              type="search"
              id="endlocation"
              ref={endboxref}
              onChange={handleSearchInputChange}
              className="flex-grow p-3 ps-3 text-sm text-gray-800 rounded-lg bg-white border border-gray-300 focus:outline-none placeholder-gray-500"
              placeholder="Dropoff Location"
              autoComplete="off"
              required
            />
            <button
              type="button"
              onClick={drawRoute}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go
            </button>
          </div>
        </div>

        {/* Autocomplete Suggestions */}
        {autocompleteResults.length > 0 && (
          <div className="mt-2 absolute bg-white shadow-lg border rounded-md z-50 w-full max-h-64 overflow-y-auto">
            <ul ref={suggestionsRef} className="divide-y divide-gray-200">
              {autocompleteResults.map((place, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
                  onClick={() => {
                    if (activeInput === "start_location") {
                      handlesuggestionstart(place);
                    } else if (activeInput === "endlocation") {
                      handlesuggestionend(place);
                    }
                  }}
                >
                  {place.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Map Display */}
        <div
          className="mt-4 h-96 w-full rounded-lg border"
          ref={mapContainer}
        ></div>
        {distance && duration && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow border border-gray-200">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Route Summary
            </h3>

            <div className="flex items-center justify-between text-gray-700">
              <div className="flex items-center space-x-2">
                <Route className="text-blue-600" size={20} />
                <span className="text-sm">
                  <span className="font-medium">Distance:</span> {distance}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="text-green-600" size={20} />
                <span className="text-sm">
                  <span className="font-medium">ETA:</span> {duration}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Items</h2>
          <button
            type="button"
            onClick={addItem}
            className="btn btn-sm btn-outline"
          >
            + Add Item
          </button>
        </div>

        {formData.items.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-3 border border-gray-200 rounded-md bg-gray-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Item Name */}
              <div>
                <label
                  htmlFor={`item-name-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id={`item-name-${index}`}
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                  className={`input ${
                    errors.items && errors.items[index]?.name
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  placeholder="Product name"
                />
                {errors.items && errors.items[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.items[index].name}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label
                  htmlFor={`item-quantity-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id={`item-quantity-${index}`}
                  name="quantity"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className={`input ${
                    errors.items && errors.items[index]?.quantity
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  placeholder="Quantity"
                />
                {errors.items && errors.items[index]?.quantity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.items[index].quantity}
                  </p>
                )}
              </div>

              {/* Weight */}
              <div>
                <label
                  htmlFor={`item-weight-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Weight
                </label>
                <input
                  type="text"
                  id={`item-weight-${index}`}
                  name="weight"
                  value={item.weight}
                  onChange={(e) => handleItemChange(index, e)}
                  className={`input ${
                    errors.items && errors.items[index]?.weight
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  placeholder="E.g., 10kg"
                />
                {errors.items && errors.items[index]?.weight && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.items[index].weight}
                  </p>
                )}
              </div>
            </div>

            {formData.items.length > 1 && (
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Total Weight */}
          <div>
            <label
              htmlFor="totalWeight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Total Weight
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="totalWeight"
                name="totalWeight"
                value={formData.totalWeight}
                onChange={handleChange}
                className={`input pl-10 ${
                  errors.totalWeight
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                placeholder="E.g., 100kg"
              />
            </div>
            {errors.totalWeight && (
              <p className="mt-1 text-sm text-red-600">{errors.totalWeight}</p>
            )}
          </div>

          {/* Dimensions */}
          <div>
            <label
              htmlFor="dimensions"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dimensions
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Truck className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className={`input pl-10 ${
                  errors.dimensions
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                placeholder="E.g., 2x3x4 ft"
              />
            </div>
            {errors.dimensions && (
              <p className="mt-1 text-sm text-red-600">{errors.dimensions}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-xl font-semibold mb-4">Schedule & Budget</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Expected Pickup Date */}
          <div>
            <label
              htmlFor="expectedPickupDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expected Pickup Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="expectedPickupDate"
                name="expectedPickupDate"
                min={today}
                value={formData.expectedPickupDate}
                onChange={handleChange}
                className={`input pl-10 ${
                  errors.expectedPickupDate
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {errors.expectedPickupDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.expectedPickupDate}
              </p>
            )}
          </div>

          {/* Expected Delivery Date */}
          <div>
            <label
              htmlFor="expectedDeliveryDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expected Delivery Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="expectedDeliveryDate"
                name="expectedDeliveryDate"
                min={today}
                value={formData.expectedDeliveryDate}
                onChange={handleChange}
                className={`input pl-10 ${
                  errors.expectedDeliveryDate
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {errors.expectedDeliveryDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.expectedDeliveryDate}
              </p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Budget
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="budget"
                name="budget"
                min="1"
                step="1"
                value={formData.budget}
                onChange={handleChange}
                className={`input pl-10 ${
                  errors.budget
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                placeholder="Your budget in USD"
              />
            </div>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700  text-white px-4 py-2 rounded-md transition"
        >
          {isSubmitting ? "Creating Order..." : "Create Order"}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
