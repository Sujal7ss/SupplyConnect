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

import BidsPage from "./pages/BidsPage.jsx";
// import AllOrders from "./pages/AllOrders.jsx";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* Wrap Home with MapPr */}
              <Route index element={<MapPr><Home /></MapPr>} />
              <Route path="orders" element={<Orders />} />
              {/* Wrap OrderDetails with MapPr */}
              <Route path="order-details/:id" element={<MapPr><OrderDetails /></MapPr>} />
              <Route path="bids/:id" element={<BidsPage />} />
              <Route path="/suppliers" element={<SupplierProfile />} />
            </Route>
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
