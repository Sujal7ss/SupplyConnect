
export default function() {
    return <header class="bg-white shadow-md px-4 py-2 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <img
        src="https://via.placeholder.com/40"
        alt="Logo"
        class="w-10 h-10 rounded-full"
      />
      <span class="text-xl font-semibold text-gray-800">SupplyConnect</span>
    </div>
    <button class="bg-gray-200 rounded-full p-2 flex items-center justify-center">
      <svg
        class="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.403-1.403A8.004 8.004 0 0016 7a8.004 8.004 0 00-6.597 8.597L8 17h5m-5 0H4m11-6V6m0 0V4a2 2 0 00-2-2m0 2v4a2 2 0 002 2m0 0v2"
        />
      </svg>
    </button>
  </header>
}
