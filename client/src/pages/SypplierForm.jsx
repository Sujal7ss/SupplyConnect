import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SupplierDetails() {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Replace the URL with your API endpoint
      const response = await axios.post("/api/supplier-details", {
        companyName,
        address,
      });
      setSuccess("Details submitted successfully!");
    } catch (err) {
      setError("Failed to submit details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Supplier Details</h1>
      <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="mb-6">
          <label htmlFor="companyName" className="block text-sm font-semibold text-gray-800">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-semibold text-gray-800">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows="4"
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        {success && <p className="text-green-500 text-sm font-semibold">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-green-300 transition ease-in-out duration-150"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <Link to="/supplier-signup" className="text-green-600 hover:underline text-sm">
            Back to Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
