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
      <div className="flex items-center w-full min-h-[calc(100vh-7rem)] justify-center "
        style={{
         
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover ",
          backgroundPosition: "center",
        }}
      >
        <Link
          to="/book_order"
          className="bg-yellow-300  py-4 px-8 rounded-full shadow-lg flex items-center space-x-3"
        >
          <span className="text-lg font-semibold ">SELECT PICKUP POINT</span>
        </Link>
      </div>
    </>
  );
};

export default Home;
