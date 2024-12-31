import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PrivateRoute from "./router/route";
import AuthProvider from "./hooks/AuthProvider";
import LandingPage from "./pages/LandingPage.jsx";

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
          <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
