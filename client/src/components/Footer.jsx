import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="btm-nav btm-nav-sm">
        <Link to="/" className="active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
        <Link to="/orders" className="active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
        <Link to="/driver/details" className="active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
  //    <footer class="bg-white shadow-md py-2 flex justify-around items-center z-10">
  //   <Link to="/" class="flex flex-col items-center text-gray-600" >
  //     <svg
  //       class="w-6 h-6"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //         stroke-width="2"
  //         d="M4 6h16M4 12h16M4 18h16"
  //       />
  //     </svg>
  //     <span class="text-sm">Home</span>
  //   </Link>

  //   <Link to="/orders" class="flex flex-col items-center text-gray-600">
  //     <svg
  //       class="w-6 h-6"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //         stroke-width="2"
  //         d="M12 6v6l4 2M6 18h12"
  //       />
  //     </svg>
  //     <span class="text-sm">Orders</span>
  //   </Link>
  //   <Link to="/suppliers/" class="flex flex-col items-center text-gray-600">
  //     <svg
  //       class="w-6 h-6"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //         stroke-width="2"
  //         d="M9 12h6M9 16h6M9 8h6"
  //       />
  //     </svg>
  //     <span class="text-sm">Profile</span>
  //   </Link>
  // </footer>
}
