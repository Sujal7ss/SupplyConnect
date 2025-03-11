import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
function Login() {
  const navigate = useNavigate();
  const [driverSelected, setDriverSelected] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState(false);

  const handleDriverSelection = () => {
    setDriverSelected(true);
    setSupplierSelected(false);
  }
  const handleSupplierSelection = () => {
    setDriverSelected(false);
    setSupplierSelected(true);
  }
  return (
    <div className="flex flex-row">
      <button onClick={()=>{navigate('/')}} className="absolute top-4 left-4 bg-primary text-black px-4 py-2 rounded">Arrow</button>
      <div className="bg-secondary h-screen w-1/2 flex flex-col justify-around items-center">
        <button onClick={()=>{handleDriverSelection()}} className="w-56 h-56 bg-white rounded-full flex flex-row justify-center items-center">
          Driver
        </button>
        {driverSelected && <LoginForm userType={'driver'}/>}
      </div>
      <div className="bg-primary h-screen w-1/2 flex flex-col justify-around items-center">
        <button onClick={()=>{handleSupplierSelection()}} className="w-56 h-56 bg-white rounded-full flex flex-row justify-center items-center">
          Supplier
        </button>
        {supplierSelected && <LoginForm userType={'supplier'}/>}
      </div>
    </div>
  );
}

export default Login;
