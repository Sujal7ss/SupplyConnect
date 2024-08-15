import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function AppLayout() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="flex flex-col min-h-screen w-full max-w-md">
        <Header />
        <main className=" flex items-center justify-center w-full overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
