import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import SupplierSignUp from "./pages/SignUp/SupplierSignUp.jsx";
import DriverSignUp from "./pages/SignUp/DriverSignUp.jsx";

import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import OrderBooking from "./pages/OrderBooking.jsx";
import Orders from "./pages/Orders.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import SupplierProfile from "./pages/SupplierProfile.jsx";
import { MapPr } from "./Context/MapContext.jsx";
import DriverDetails from "./pages/DriverDetails.jsx";

import BidsPage from "./pages/BidsPage.jsx";
// import AllOrders from "./pages/AllOrders.jsx";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order-details/:id" element={<OrderDetails />} />
            <Route path="bids/:id" element={<BidsPage />} />
            <Route path="/suppliers" element={<SupplierProfile />} />
          </Route>

            <Route path="driver/details" element={<DriverDetails />} />
          {/* Driver Routes */}
          <Route path="/driver" element={<AppLayout />}>
            <Route index element={<Orders />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/supplier" element={<SupplierSignUp />} />
          <Route path="/signup/driver" element={<DriverSignUp />} />

          <Route path="/signin" element={<SignIn />} />

          {/* Routes that require map context */}
          <Route
            path="/book-order"
            element={
              <MapPr>
                <OrderBooking />
              </MapPr>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
