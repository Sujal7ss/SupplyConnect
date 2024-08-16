import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../assets/bgimg.jpg";
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "80vh",
          justifyContent: "center",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover ",
          backgroundPosition: "center",
        }}
      >
        <Link
          to="/book-order"
          class="bg-yellow-300  py-4 px-8 rounded-full shadow-lg flex items-center space-x-3"
        >
          <span class="text-lg">Select Pickup Point</span>
        </Link>
      </div>
    </>
  );
};

export default Home;
