import { Link } from "react-router-dom";
export default function SellerNavbar({ handleLogout }) {
  return (
    <>
      <div className="flex flex-col gap-2 px-4 w-full">
        <Link
          to="/ads/seller"
          className="flex items-center gap-3 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer group"
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-3 1a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          My Ads
        </Link>
      </div>
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
