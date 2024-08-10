import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [user,setuser] = useState({
    email : "",
    password : "",
    name : "",
    gender : "Male",
    age : "",
    type : "Supplier",
  });

  const handlechange = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    setuser({
      ...user,
      [id] : value,
    });
  }
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      // Replace the URL with your API endpoint
      let url = import.meta.env.BACKEND_URL;
      const response = await axios.post(`${url}/api/signup`, user);
      setSuccess("Signup successful!");
      navigate("/");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handlechange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handlechange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlechange}
              required
              className="block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 pr-10 transition ease-in-out duration-150"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>
        <div className="mb-6 relative">
          <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-800">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={handlechange}
              required
              className="block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 pr-10 transition ease-in-out duration-150"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <i className={`fas ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="gender" className="block text-sm font-semibold text-gray-800">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={handlechange}
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="age" className="block text-sm font-semibold text-gray-800">
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handlechange}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="type" className="block text-sm font-semibold text-gray-800">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={handlechange}
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          >
            <option value="Supplier">Supplier</option>
            <option value="Driver">Driver</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        {success && <p className="text-green-500 text-sm font-semibold">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300 transition ease-in-out duration-150"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">
            Forgot Password?
          </Link>
          <Link to="/signin" className="text-blue-600 hover:underline text-sm">
            Already have an account? Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
