import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SupplierDashboard from "./components/SupplierDashboard.jsx";
import AuthProvider from "./hooks/AuthProvider";
import MapPr from "./hooks/MapProvider.jsx";
import LandingPage from "./pages/LandingPage.jsx";

import PrivateRoute, {
  DriverProtected,
  SupplierProtected,
} from "./router/route";

function App() {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    let savedMode = localStorage.getItem("displayMode");

    if (!savedMode) {
      savedMode = "light";
      setDarkmode(false);
      localStorage.setItem("displayMode", savedMode);
    }
    setDarkmode(savedMode === "dark" ? true : false);
  }, []);

  const toggleDisplayMode = () => {
    setDarkmode(!darkmode);
  };

  return (
    <div className="App bg-primary text-text-primary h-screen w-full">
      <Router>
        <AuthProvider>
          <MapPr>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Driver routes */}
              <Route element={<DriverProtected />}>
                <Route path="/homepage" element={<Dashboard />} />
              </Route>

              {/* Supplier routes */}
              <Route element={<SupplierProtected />}>
                <Route path="/dashboard" element={<SupplierDashboard />} />
              </Route>
              {/* Other routes */}
            </Routes>
          </MapPr>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
