import React,{useState} from "react";

const ToggleButton = () => {
  const [active, setActive] = useState("waiting");

  const handleActive = (status) => {
    setActive(status);
    setFilter(status); // Update the filter when an option is selected
  };
  return (
    <div className="bg-white w-full h-20 rounded-badge min-w-m flex p-3 shadow-md">
      <div
        onClick={() => handleActive("waiting")}
        className={`w-full flex items-center rounded-badge justify-center cursor-pointer shadow-md ${
          active === "waiting" ? "bg-yellow-300" : "bg-white"
        }`}
      >
        Waiting
      </div>
      <div
        onClick={() => handleActive("picked")}
        className={`w-full flex items-center rounded-badge justify-center cursor-pointer shadow-md ${
          active === "picked" ? "bg-yellow-300" : "bg-white"
        }`}
      >
        Picked
      </div>
    </div>
  );
};

export default ToggleButton;
