import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminNavbar from "./adminNavbar";
import GuestNavbar from "./guestNavbar";
import SellerNavbar from "./sellerNavbar";
import BuyerNavbar from "./buyerNavbar";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const renderNavbar = () => {
    if (!user) return null;

    switch (user.role) {
      case "admin":
        return <AdminNavbar handleLogout={handleLogout} />;
      case "seller":
        return <SellerNavbar handleLogout={handleLogout} />;
      case "buyer":
        return <BuyerNavbar handleLogout={handleLogout} />;
      default:
        return <GuestNavbar />;
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    } else {
      // Fallback if onLogout not provided
      await performLogout(api, navigate);
    }
  };

  return (
    <>
      <nav className="h-[screen] w-[15%] border-r border-gray-500 ">
        <div className="flex flex-col gap-6 py-16 w-full">
          {/* User Section */}
          <div className="px-8 pb-6 border-b border-gray-700">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                {user?.role || "Guest"}
              </div>
              <h1 className="text-orange-500 text-xl font-semibold">
                {user?.name}
              </h1>
              {(user.role === "seller" || user.role === "buyer") && (
                <p className="text-gray-400 text-sm mt-1">
                  Total Points: {user?.points}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 px-4 w-full">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer group"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
          </div>
          {renderNavbar()}
        </div>
      </nav>
    </>
  );
}
