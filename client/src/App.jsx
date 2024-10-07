import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout components
import AppLayout from "./components/AppLayout.jsx";
import Layout from "./components/Layout.jsx";

// Pages
import { Home, OrderBooking, OrderDetails, Orders, SupplierProfile, BidsPage, DriverDetails, SignIn, DriverSignUp, SignUp, SupplierSignUp} from "./pages"

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
