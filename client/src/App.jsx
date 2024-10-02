import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout components
import AppLayout from "./components/AppLayout.jsx";
import Layout from "./components/Layout.jsx";

// Pages
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import SupplierSignUp from "./pages/SignUp/SupplierSignUp.jsx";
import DriverSignUp from "./pages/SignUp/DriverSignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import OrderBooking from "./pages/OrderBooking.jsx";
import Orders from "./pages/Orders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import SupplierProfile from "./pages/SupplierProfile.jsx";
import DriverDetails from "./pages/DriverDetails.jsx";
import BidsPage from "./pages/BidsPage.jsx";
// import AllOrders from "./pages/AllOrders.jsx";

// Context
import { MapPr } from "./Context/MapContext.jsx";
// import { AuthProvider } from "./Context/AuthContext.jsx";

function App() {
  return (
    <>
      {/* <AuthProvider> Uncomment when AuthProvider is needed */}
      <BrowserRouter>
        <Routes>
          {/* App Layout Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order-details/:id" element={<MapPr><OrderDetails /></MapPr>} />
            <Route path="bids/:order_id" element={<BidsPage />} />
            <Route path="suppliers" element={<SupplierProfile />} />
          </Route>

          {/* Order Booking Route with Map Context */}
          <Route path="/book-order" element={<MapPr><OrderBooking /></MapPr>} />

          {/* Driver Details */}
          <Route path="driver/details" element={<DriverDetails />} />

          {/* Driver-specific Routes */}
          <Route path="/driver" element={<AppLayout />}>
            <Route index element={<Orders />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/supplier" element={<SupplierSignUp />} />
          <Route path="/signup/driver" element={<DriverSignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Additional Routes that may require Map context */}
        </Routes>
      </BrowserRouter>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
