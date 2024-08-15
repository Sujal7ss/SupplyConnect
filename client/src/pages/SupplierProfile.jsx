import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SupplierProfile = () => {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    phoneNo: '',
  });

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`/api/auth/getuser`);
        console.log(response.data.data)
        setSupplier(response.data.data);
        setFormData({
          companyName: response.data.data.companyName,
          address: response.data.data.address,
          phoneNo: response.data.data.phoneNo,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch supplier details.');
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      companyName: supplier.companyName,
      address: supplier.address,
      phoneNo: supplier.phoneNo,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/suppliers/${supplierId}`, formData);
      setSupplier({ ...supplier, ...formData });
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update supplier details.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 w-full min-h-60 mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Supplier Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNo" className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Company Name:</span>
            <p>{supplier.companyName}</p>
          </div>
          <div>
            <span className="font-semibold">Address:</span>
            <p>{supplier.address}</p>
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span>
            <p>{supplier.phoneNo}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierProfile;
