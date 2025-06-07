import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBox,
  FaMapMarkerAlt,
  FaEnvelope,
  FaThLarge,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navItems = [
  { label: "Dashboard", icon: <FaThLarge />, path: "/admin/dashboard" },
  { label: "Shipments", icon: <FaBox />, path: "/admin/shipments" },
  { label: "Tracking", icon: <FaMapMarkerAlt />, path: "/admin/tracking" },
  { label: "Contact Us", icon: <FaEnvelope />, path: "/admin/contact" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#373737] p-2 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-[#373737] text-white z-40 
        transform transition-transform duration-300 
        h-screen md:h-screen overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <nav className="flex flex-col justify-between h-full py-6">
          <ul className="space-y-3 mt-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-8 py-3 transition-colors ${
                    isActive(item.path)
                      ? "bg-green-500 font-semibold"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Wallet Info */}
          <div className="bg-[#4D9FE0] mx-8 mb-4 px-3 py-2 rounded-full text-xs font-mono text-center">
            0x8cck...fff
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
