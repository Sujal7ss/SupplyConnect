import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// Layout components
import AppLayout from "./components/AppLayout.jsx";
import Layout from "./components/Layout.jsx";

// Pages
import {
  Home,
  OrderBooking,
  OrderDetails,
  Orders,
  SupplierProfile,
  BidsPage,
  DriverDetails,
  SignIn,
  DriverSignUp,
  SignUp,
  SupplierSignUp,
} from "./pages";

// Context
import { MapPr } from "./Context/MapContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup/supplier" element={<SupplierSignUp />} />
            <Route path="/signup/driver" element={<DriverSignUp />} />

            {/* Protected Routes */}
            {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="orders" element={<Orders />} />
                <Route
                  path="order-details/:id"
                  element={
                    <MapPr>
                      <OrderDetails />
                    </MapPr>
                  }
                />
                <Route path="bids/:order_id" element={<BidsPage />} />
                <Route path="suppliers" element={<SupplierProfile />} />
              {/* </Route> */}

              <Route
                path="/book_order"
                element={
                  <MapPr>
                    <OrderBooking />
                  </MapPr>
                }
              />
              <Route path="driver/details" element={<DriverDetails />} />
              <Route path="/driver" element={<AppLayout />}>
                <Route index element={<Orders />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
