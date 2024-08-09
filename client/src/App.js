import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import SypplierForm from "./pages/SypplierForm.jsx";
import DriverForm from "./pages/DriverForm.jsx";
import RideBooking from "./pages/RideBooking.jsx";
import Orders from "./pages/Orders.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/sypplierform" element={<SypplierForm />} />
            <Route path="/driverform" element={<DriverForm />} />
            <Route path="book-ride" element={<RideBooking />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
