import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MapPr } from "./contexts/MapContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";
import CreateOrderPage from "./pages/supplier/CreateOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Loader from "./components/common/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <AuthProvider>
      <MapPr>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login\" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Supplier Routes */}
            <Route
              path="/supplier/*"
              element={
                <ProtectedRoute allowedRole="supplier">
                  <Routes>
                    <Route path="/" element={<SupplierDashboard />} />
                    <Route path="create-order" element={<CreateOrderPage />} />
                    <Route
                      path="orders/:orderId"
                      element={<OrderDetailsPage userType="supplier" />}
                    />
                    <Route
                      path="profile"
                      element={<ProfilePage userType="supplier" />}
                    />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Driver Routes */}
            <Route
              path="/driver/*"
              element={
                <ProtectedRoute allowedRole="driver">
                  <Routes>
                    <Route path="/" element={<DriverDashboard />} />
                    <Route
                      path="orders/:orderId"
                      element={<OrderDetailsPage userType="driver" />}
                    />
                    <Route
                      path="profile"
                      element={<ProfilePage userType="driver" />}
                    />
                  </Routes>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </MapPr>
    </AuthProvider>
  );
}

export default App;
