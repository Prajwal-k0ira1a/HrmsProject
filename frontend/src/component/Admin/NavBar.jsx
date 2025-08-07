import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!localStorage.getItem("token") && !localStorage.getItem("user"))
    return null;

  return (
    <nav className="relative p-4 bg-gray-800 text-white flex items-center justify-center">
      <div className="flex gap-6">
        <Link to="/home" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-400">
          About
        </Link>
      </div>

      <button
        className="absolute right-4 bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
