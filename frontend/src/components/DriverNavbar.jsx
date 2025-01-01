import React from "react";
import {useAuth} from "../hooks/AuthProvider";

const NavItems = ["Home", "About", "How to Use", "Team"];
function DriverNavbar() {
  const { logOut } = useAuth();
  return (
    <div className="w-full h-16 bg-secondary">
      <div className="flex justify-between  items-center h-full p-4">
        <div className="text-text-secondary text-2xl font-bold hover:text-text-primary hover:cursor-pointer">
          Supply-Connect
        </div>

        <div>
          <ul className="flex gap-10">
            {NavItems.map((item, index) => (
              <li
                key={index}
                className="text-text-secondary  font-semibold  hover:text-text-primary hover:cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 p-4">
          {/* <Link to='/signup' className="border-2 border-text-primary p-2 rounded-md bg-secondary hover:bg-primary font-bold transition delay-100 ">SignUp</Link>
          <Link to='/dashboard' className="border-2 border-text-primary p-2 rounded-md bg-secondary hover:bg-primary font-bold transition delay-100 ">Login</Link> */}
          <button onClick={() => {logOut()}}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default DriverNavbar;
