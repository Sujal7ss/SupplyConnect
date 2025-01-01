import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

export default function SupplierSignUp() {
  const { loginAction } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [datauser, setUser] = useState({
    email: "",
    password: "",
    name: "",
    type: "supplier",
    companyName: "",
    address: "",
    phoneNo: "",
  });

  const handleChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    setUser({
      ...datauser,
      [id]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (datauser.password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup/supplier`,
        datauser
      );

      if(!res.data.success)
      {
        return toast.error(res.error);
      }
      
      toast.success("Sign Up successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      console.log(err);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 ">
      <h1 className="text-xl font-bold uppercase mb-3 text-text-primary">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="w-full ">
        {step === 1 && (
          <>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm  text-text-secondary"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={datauser.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-2 bg-gray-300 border-gray-300 rounded-lg shadow-md px-4 py-2 transition ease-in-out duration-150"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm  text-text-secondary"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={datauser.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-2 bg-gray-300 border-gray-300 rounded-lg shadow-md px-4 py-2 transition ease-in-out duration-150"
              />
            </div>
            <div className="mb-2 relative">
              <label
                htmlFor="password"
                className="block text-sm  text-text-secondary"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={datauser.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-2 bg-gray-300 border-gray-300 rounded-lg shadow-md px-4 py-2 transition ease-in-out duration-150"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  <i
                    className={`fas ${
                      passwordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="mb-2 relative">
              <label
                htmlFor="confirm-password"
                className="block text-sm  text-text-secondary"
              >
                Confirm Password
              </label>
              <div className="mb-4 relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full border-2 bg-gray-300 border-gray-300 rounded-lg shadow-md px-4 py-2 transition ease-in-out duration-150"
                />
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  <i
                    className={`fas ${
                      confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3 px-4 bg-text-secondary hover:bg-secondary hover:text-text-secondary text-secondary font-bold rounded-lg shadow-md  transition ease-in-out duration-150"
            >
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-2">
              <label
                htmlFor="companyName"
                className="block text-sm  text-text-secondary"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={datauser.companyName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-2 bg-gray-300 border-gray-300 rounded-lg shadow-md px-4 py-2 transition ease-in-out duration-150"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="address"
                className="block text-sm  text-text-secondary"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={datauser.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-2 bg-gray-300 border-gray-300 rounded-lg shadow-md px-4 py-2 transition ease-in-out duration-150"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNo"
                className="block text-sm  text-text-secondary"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNo"
                value={datauser.phoneNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-2 bg-gray-300 border-gray-300 rounded-lg shadow-md px-4 py-2 transition ease-in-out duration-150"
              />
            </div>
            <button
              type="button"
              onClick={prevStep}
              className="mb-3 w-full py-3 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition ease-in-out duration-150"
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-text-secondary hover:bg-secondary hover:text-text-secondary text-secondary font-bold rounded-lg shadow-md  transition ease-in-out duration-150"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </>
        )}

        <div className="mt-4 flex flex-col items-center space-y-2">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
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
