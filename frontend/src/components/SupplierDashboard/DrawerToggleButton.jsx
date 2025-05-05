import { IoMenu } from "react-icons/io5";

const DrawerToggleButton = ({ drawerOpen, setDrawerOpen }) => (
  <button
    className={`${drawerOpen && "hidden"} absolute top-4 left-4 z-50 bg-text-secondary text-white px-3 py-2 rounded-md shadow-md hover:bg-opacity-80`}
    onClick={() => setDrawerOpen(true)}
  >
    <IoMenu size={20} />
  </button>
);

export default DrawerToggleButton;
