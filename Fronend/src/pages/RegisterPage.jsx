import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate =useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password_confirmation: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    try {
      // For Sanctum, make sure to get CSRF cookie first
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await api.post("/register", formData);
      console.log("User registered:", response.data);
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: error.response?.data?.message || "Something went wrong",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-orange-400 text-3xl font-bold mb-12">
        Create a new account
      </h1>

      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Name Input */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-orange-500 focus:border-orange-600 focus:ring-1 focus:ring-orange-500 outline-none bg-transparent p-3 rounded w-full caret-orange-500 text-white placeholder-gray-400"
          placeholder="Name"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-orange-500 focus:border-orange-600 focus:ring-1 focus:ring-orange-500 outline-none bg-transparent p-3 rounded w-full caret-orange-500 text-white placeholder-gray-400"
          placeholder="email"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
        )}

        {/* Password Input */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-orange-500 focus:border-orange-600 focus:ring-1 focus:ring-orange-500 outline-none bg-transparent p-3 rounded w-full caret-orange-500 text-white placeholder-gray-400"
          placeholder="Password"
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
        )}

        {/* Confirm Password Input */}
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          className="border border-orange-500 focus:border-orange-600 focus:ring-1 focus:ring-orange-500 outline-none bg-transparent p-3 rounded w-full caret-orange-500 text-white placeholder-gray-400"
          placeholder="Confirm Password"
          required
        />
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password_confirmation[0]}
          </p>
        )}

        {/* Roles Section */}
        <div className="flex gap-4 mt-4 justify-center">
          <p className="text-white">Register As:</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              checked={formData.role === "Seller"}
              value="Seller"
              onChange={handleChange}
              className="accent-orange-500 w-5 h-5"
              required
            />
            <span className="text-white">Seller</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              checked={formData.role === "Buyer"}
              value="Buyer"
              onChange={handleChange}
              className="accent-orange-500 w-5 h-5"
              required
            />
            <span className="text-white">Buyer</span>
          </label>
        </div>
        {errors.general && (
          <p className="text-red-500 text-sm text-center">{errors.general}</p>
        )}
        {/* Buttons Section */}
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded transition"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <p className="text-white text-center">Already have an account?</p>
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded transition cursor-pointer text-center"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
