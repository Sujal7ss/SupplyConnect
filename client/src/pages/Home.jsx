import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import truckpng from "../assets/home.jpg";
const Home = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClick(true);

    setTimeout(() => {
      navigate("/book-order");
    }, 1000);
  };
  return (
    <>
      <div>
        {/* <img src={truckpng} alt="truck" className="w-full h-96" /> */}
        <div
          onClick={handleClick}
          className={`w-11/12 h-20 flex items-center rounded-badge justify-center text-lg font-semibold cursor-pointer shadow-md  ${
            click ? "bg-yellow-100" : "bg-yellow-300"
          }`}
        >
          Book Truck
        </div>
      </div>
    </>
  );
};

export default Home;
