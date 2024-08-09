import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import SypplierForm from "./pages/SypplierForm.jsx"
import DriverForm from "./pages/DriverForm.jsx"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/sypplierform" element={<SypplierForm />} />
            <Route path="/driverform" element={<DriverForm />} />
            
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
