import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function AppLayout() {
  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen">
      <div className="flex flex-col w-full max-w-md min-h-screen">
        <Header />
        <main className="flex-grow w-full overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
