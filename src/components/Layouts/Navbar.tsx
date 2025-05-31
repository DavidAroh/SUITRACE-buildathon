// src/components/Layout/Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getUserRole } from '../../lib/auth';



const Navbar = () => {
  const role = getUserRole();
  const [user, setUser] = useState<User | null>(null);

  return (
    // <nav className="bg-white shadow px-6 py-4 flex justify-between">
    //   <h1 className="text-lg font-bold text-blue-600">SuiTrace</h1>
    //   <div className="space-x-4">
    //     <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
    //     <Link to="/shipments" className="text-gray-700 hover:text-blue-600">Shipments</Link>
    //     <Link to="/tracking" className="text-gray-700 hover:text-blue-600">Tracking</Link>
    //     {role === 'admin' && (
    //       <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin Panel</Link>
    //     )}
    //   </div>
    // </nav>
     <nav className="bg-[#585858] text-white p-6 flex justify-center place-items-center">
        <div className="flex flex-row sm:flex-row sm:items-center sm:space-x-6 text-sm items-center relative w-full max-w-6xl">
          {/* Navigation Links */}
          <div className="flex space-x-6 justify-center text-sm sm:text-base relative left-80">
            <Link to="/dashboard" className="hover:border-[#4D9FE0]">Dashboard</Link>
            <Link
              to="/shipments"
              className="px-4 py-1 border border-[#4D9FE0] rounded-full text-white relative bottom-1"
            >
              Shipments
            </Link>
            <a href="#" className="border-none border-[#4D9FE0] rounded-full hover:border-[#4D9FE0]">Tracking</a>
            <a href="#" className="hover:border-[#4D9FE0]">Contact Us</a>
          </div>

          {/* Wallet Address */}
          <div className="bg-[#4D9FE0] px-4 py-2 rounded-full text-xs font-mono ml-10 absolute right-1 bottom-1">
            {user?.address
              ? user.address.slice(0, 6) + "..." + user.address.slice(-4)
              : "0X8cck.....fff"}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
