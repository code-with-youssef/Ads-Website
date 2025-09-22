import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import SellerAds from "../pages/SellerAds";
import AdminAds from "../pages/AdminAds";

const router = createBrowserRouter([
  { path: "/register", element: <RegisterPage /> },
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "/ads/seller", element: <SellerAds /> },
  { path: "/ads/admin", element: <AdminAds /> },
]);

export default router;
