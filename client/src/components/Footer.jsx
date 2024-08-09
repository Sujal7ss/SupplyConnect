import { Link } from "react-router-dom"

export default function Footer() {
    return <footer class="bg-white shadow-md py-2 flex justify-around items-center">
    <Link to="/" class="flex flex-col items-center text-gray-600" >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <span class="text-sm">Menu</span>
    </Link>

    <Link to="/orders" class="flex flex-col items-center text-gray-600">
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6l4 2M6 18h12"
        />
      </svg>
      <span class="text-sm">Orders</span>
    </Link>
    <Link class="flex flex-col items-center text-gray-600">
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6M9 16h6M9 8h6"
        />
      </svg>
      <span class="text-sm">Profile</span>
    </Link>
  </footer>
}