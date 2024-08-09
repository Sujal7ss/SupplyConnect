import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DriverDetails() {
  const [licensePlateNumber, setLicensePlateNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [privacyConcern, setPrivacyConcern] = useState(false);
  const [termsAndPolicies, setTermsAndPolicies] = useState(false);
  const [healthConcern, setHealthConcern] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const response = await axios.post("/api/driver-details", {
        licensePlateNumber,
        aadharNumber,
        vehicleType,
      });
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
          <label htmlFor="licensePlateNumber" className="block text-sm font-semibold text-gray-800">
            License Plate Number
          </label>
          <input
            type="text"
            id="licensePlateNumber"
            value={licensePlateNumber}
            onChange={(e) => setLicensePlateNumber(e.target.value)}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="aadharNumber" className="block text-sm font-semibold text-gray-800">
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadharNumber"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="vehicleType" className="block text-sm font-semibold text-gray-800">
            Vehicle Type
          </label>
          <input
            type="text"
            id="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacyConcern"
              checked={privacyConcern}
              onChange={(e) => setPrivacyConcern(e.target.checked)}
              className="form-checkbox h-5 w-5 text-yellow-600"
            />
            <label htmlFor="privacyConcern" className="ml-2 text-sm font-semibold text-gray-800">
              Privacy Concern
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsAndPolicies"
              checked={termsAndPolicies}
              onChange={(e) => setTermsAndPolicies(e.target.checked)}
              className="form-checkbox h-5 w-5 text-yellow-600"
            />
            <label htmlFor="termsAndPolicies" className="ml-2 text-sm font-semibold text-gray-800">
              Terms and Policies
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="healthConcern"
              checked={healthConcern}
              onChange={(e) => setHealthConcern(e.target.checked)}
              className="form-checkbox h-5 w-5 text-yellow-600"
            />
            <label htmlFor="healthConcern" className="ml-2 text-sm font-semibold text-gray-800">
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
