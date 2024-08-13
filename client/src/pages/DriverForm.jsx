import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DriverDetails() {
  const [driver, setDriver] =useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    registrationNumber: "",
    vehicleType: "",
    drivingLicense: "",
    adhaarCard: "",
    tnc: false,
    health: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    let id = e.target.id;
    let value = e.target.value
    if(e.target.type === "checkbox") {
      value = e.target.checked;
    }
    else{
    }
    setDriver({
      ...driver,
      [id] : value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!privacyConcern || !termsAndPolicies || !healthConcern) {
      setError("Please agree to all checkboxes.");
      setLoading(false);
      return;
    }

    try {
      // Replace the URL with your API endpoint
      const response = await axios.post('/api/driver-details',driver );
      setSuccess("Details submitted successfully!");
    } catch (err) {
      setError("Failed to submit details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow-xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Driver Details</h1>
      <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={driver.name}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="dob" className="block text-sm font-semibold text-gray-800">
            Date of Birth
          </label>
          <input
            type="text"
            id="dob"
            value={driver.dob}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="gender" className="block text-sm font-semibold text-gray-800">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            value={driver.gender}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-semibold text-gray-800">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={driver.address}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="drivingLicense" className="block text-sm font-semibold text-gray-800">
            Driving License No
          </label>
          <input
            type="text"
            id="drivingLicense"
            value={driver.drivingLicense}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="adhaarCard" className="block text-sm font-semibold text-gray-800">
            Driving License No
          </label>
          <input
            type="text"
            id="adhaarCard"
            value={driver.adhaarCard}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="registrationNumber" className="block text-sm font-semibold text-gray-800">
            Registration No
          </label>
          <input
            type="text"
            id="registrationNumber"
            value={driver.registrationNumber}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="vehicleType" className="block text-sm font-semibold text-gray-800">
            Aadhar Number
          </label>
          <input
            type="text"
            id="vehicleType"
            value={driver.vehicleType}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="tnc"
              checked={driver.tnc}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-yellow-600"
            />
            <label htmlFor="tnc" className="ml-2 text-sm font-semibold text-gray-800">
              Terms and Policies
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="health"
              checked={driver.health}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-yellow-600"
            />
            <label htmlFor="health" className="ml-2 text-sm font-semibold text-gray-800">
              Health Concern
            </label>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        {success && <p className="text-green-500 text-sm font-semibold">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:bg-yellow-300 transition ease-in-out duration-150"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <Link to="/driver-signup" className="text-yellow-600 hover:underline text-sm">
            Back to Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
