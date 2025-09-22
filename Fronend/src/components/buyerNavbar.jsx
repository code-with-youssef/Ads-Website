import { Link } from "react-router-dom";
export default function BuyerNavbar({handleLogout}) {
  return (
    <>
      {/* Logout Section */}
      <div className="mt-auto px-4 pt-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer group w-full"
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
}
