import { Link } from "react-router-dom";
export default function GuestNavbar() {
  return (
    <div className="flex flex-col gap-2 px-4 w-full">
      <Link
        to="/login"
        className="flex items-center gap-3 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer group"
      >
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm11.293.293a1 1 0 011.414 1.414L14.414 7H17a1 1 0 110 2h-2.586l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3z"
            clipRule="evenodd"
          />
        </svg>
        Login
      </Link>
    </div>
  );
}
