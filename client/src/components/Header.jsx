import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"

export default function () {
  const navigate = useNavigate();

  const logout = async () => {
    const response = await axios.post("/api/auth/logout");
    navigate("/signin");
    // console.log(response);
  };

  return (
    <>
      <div className="navbar bg-base-100 navbar-center  border-b-gray-300 border-b-2 rounded-lg ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">SupplyConnect</a>
        </div>
        <div className="flex-none gap-2">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/suppliers" className="justify-between">Profile</Link>
                  
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
    
  );
}
