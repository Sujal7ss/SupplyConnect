import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import SupplierForm from "./pages/SupplierForm.jsx";
import DriverForm from "./pages/DriverForm.jsx";
import OrderBooking from "./pages/OrderBooking.jsx";
import Orders from "./pages/Orders.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="orders" element={<Orders />} />
              <Route path="/order-details/:id" element={<OrderDetails />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/supplierform" element={<SupplierForm />} />
            <Route path="/driverform" element={<DriverForm />} />
            <Route path="/book-order" element={<OrderBooking />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
