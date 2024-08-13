import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function AppLayout() {
  return (
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="flex flex-col min-h-screen w-full max-w-md">
        <Header />
        <main class="flex-grow flex items-center justify-center overflow-y-auto max-w-md">
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
