import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getUserRole } from '../../lib/auth';
import { FaBars, FaTimes } from "react-icons/fa";

interface User {
  address?: string;
}

const Navbar = () => {
  const role = getUserRole();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Example fetch simulation (replace with actual user logic)
  useEffect(() => {
    setUser({ address: "0X8cckdfk38fjskfff" });
  }, []);

  return (
    <nav className="bg-[#585858] text-white p-4 sm:p-6 flex justify-between items-center relative">

      {/* Hamburger Icon for Mobile */}
      <button
        className="sm:hidden z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Navigation Links */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm sm:text-base absolute sm:static top-16 left-0 w-full sm:w-auto bg-[#585858] sm:bg-transparent transition-transform duration-300 z-40
          ${menuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'} sm:translate-x-0 sm:flex-row`}
      >
        <Link to="/user/dashboard" className="py-2 px-4 hover:border-[#4D9FE0] border-b sm:border-none">Dashboard</Link>
        <Link
          to="/shipments"
          className="py-2 px-4 border border-[#4D9FE0] rounded-full text-white"
        >
          Shipments
        </Link>
        <Link to="/tracking" className="py-2 px-4 hover:border-[#4D9FE0] border-b sm:border-none">Tracking</Link>
        <Link to="/contact" className="py-2 px-4 hover:border-[#4D9FE0] border-b sm:border-none">Contact Us</Link>
        {role === 'admin' && (
          <Link to="/admin" className="py-2 px-4 hover:border-[#4D9FE0] border-b sm:border-none">Admin Panel</Link>
        )}
      </div>

      {/* Wallet Address */}
      <div className="bg-[#4D9FE0] px-4 py-2 rounded-full text-xs font-mono ml-4 hidden sm:block">
        {user?.address
          ? user.address.slice(0, 6) + "..." + user.address.slice(-4)
          : "0X8cck.....fff"}
      </div>
    </nav>
  );
};

export default Navbar;
