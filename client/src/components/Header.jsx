import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
export default function() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const loguserout = async () => {
      const response  = await axios.post("/api/auth/logout");
      logout
      navigate("/signin");
      console.log(response);
    }

    return <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <img
        src="https://via.placeholder.com/40"
        alt="Logo"
        className="w-10 h-10 rounded-full"
      />
      <span className="text-xl font-semibold text-gray-800">SupplyConnect</span>
    </div>
    <button className="bg-gray-200 rounded-full p-2 flex items-center justify-center">
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 17h5l-1.403-1.403A8.004 8.004 0 0016 7a8.004 8.004 0 00-6.597 8.597L8 17h5m-5 0H4m11-6V6m0 0V4a2 2 0 00-2-2m0 2v4a2 2 0 002 2m0 0v2"
        />
      </svg>
    </button>
    <button className="bg-gray-200 rounded-full p-2 flex items-center justify-center" onClick={loguserout}>
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </svg>
    </button>
    
  </header>
}
