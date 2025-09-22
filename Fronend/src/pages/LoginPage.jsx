import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      // Sanctum CSRF
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await api.post("/login", formData);
      console.log("User entered:", response.data);
      navigate("/Dashboard");
    } catch (error) {
      if (error.response?.status === 422) {

        setErrors(error.response.data.errors || {});
      } else {

        setErrors({ general: error.response?.data?.message || "Something went wrong" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-orange-400 text-3xl font-bold mb-12">
        Login to your account
      </h1>

      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-orange-500 focus:border-orange-600 focus:ring-1 focus:ring-orange-500 outline-none bg-transparent p-3 rounded w-full caret-orange-500 text-white placeholder-gray-400"
            placeholder="Email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
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
        </div>

        {/* General Errors */}
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
            {isLoading ? "Login..." : "Login"}
          </button>
          <p className="text-white text-center">Don't have an account?</p>
          <Link
            to="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded transition cursor-pointer text-center"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
