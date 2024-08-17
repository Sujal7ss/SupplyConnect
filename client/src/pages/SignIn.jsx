import { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom"; // Import Link from React Router
import { useAuth } from "../Context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("supplier");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { storeTokenInLS} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // const response = await axios.post("/api/auth/login", {
      //   email,
      //   password,
      //   type,
      // });
      setSuccess("Sign In successful!");
      // storeTokenInLS(response.data.data.token);
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setError("Sign In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-xl mx-auto min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Sign In</h1>
      <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
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
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 px-4 py-2 pr-10 transition ease-in-out duration-150"
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
        <div className="mb-6">
          <label htmlFor="type" className="block text-sm font-semibold text-gray-800">
            Select Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
          >
            <option value="driver">Driver</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        {success && <p className="text-green-500 text-sm font-semibold">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-green-300 transition ease-in-out duration-150"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <Link to="/forgot-password" className="text-green-600 hover:underline text-sm">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-green-600 hover:underline text-sm">
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
