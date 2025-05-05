import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Ensure it uses the auth context

export default function Header() {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth(); // Get logout from context

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      authLogout(); // Clear local auth state
      navigate("/signin");
    }
  };

  return (
    <div className="navbar bg-base-100 border-b-2 border-gray-300 rounded-lg px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          SupplyConnect
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 bg-base-100 rounded-box z-10 p-2 shadow"
          >
            <li>
              <Link to="/suppliers">Profile</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
