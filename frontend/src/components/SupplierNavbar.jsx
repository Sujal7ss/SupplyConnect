import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Notifications from "./Notifications.jsx";
const NavItems = [];

function SupplierNavbar() {
  const { logOut } = useAuth();
  const [notificationDisplay, setNotificationDisplay] = useState(false);
  const notificationRef = useRef(null);

  const handleNotificationDisplay = (event) => {
    setNotificationDisplay(!notificationDisplay);
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setNotificationDisplay(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    if (notificationDisplay) {
      document.addEventListener("mousedown", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [notificationDisplay]);

  return (
    <div className="w-full h-16 bg-secondary">
      <div className="flex justify-between items-center h-full p-4">
        <div className="text-text-secondary text-2xl font-bold hover:text-text-primary hover:cursor-pointer">
          Supply-Connect
        </div>

        <div>
          <ul className="flex gap-10">
            {NavItems.map((item, index) => (
              <li
                key={index}
                className="text-text-secondary font-semibold hover:text-text-primary hover:cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 p-4">
          <button onClick={handleNotificationDisplay}>bell</button>
          {notificationDisplay && (
            <div
              ref={notificationRef}
              className="fixed right-6 top-16 w-96 h-96 bg-black"
            >
              <Notifications />
            </div>
          )}
          <button onClick={() => logOut()}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default SupplierNavbar;
