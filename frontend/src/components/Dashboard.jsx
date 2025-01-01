import React from "react";
import { useAuth } from "../hooks/AuthProvider";

import { useMap } from "../hooks/MapProvider";
function Dashboard() {
  const {  myMap } = useMap();
  const { user } = useAuth();
  return (
    <div>
      Dashboard
      <p>Hello {user.name}</p>
      {myMap}
    </div>
  );
}

export default Dashboard;
