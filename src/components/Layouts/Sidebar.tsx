import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxes, FaMapMarkerAlt, FaHeadset, FaBox, FaEnvelope, FaThLarge, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        className={`h-lg bg-[#373737] text-white flex flex-col z-40 w-64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}
      >
        <nav className="flex-1 py-4">
          <ul className="space-y-3 mt-16 md:mt-11">
            <Link to="/admin/dashboard">
              <li className="px-8 py-3 hover:bg-gray-700 flex items-center">
                <FaThLarge className="mr-3" /> Dashboard
              </li>
            </Link>

            <li className="px-8 py-4 bg-green-500 text-white flex items-center font-semibold">
              <FaBox className="mr-3" /> Shipments
            </li>
            <li className="px-8 py-3 hover:bg-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-3" /> Tracking
            </li>
            <li className="px-8 py-3 hover:bg-gray-700 flex items-center">
              <FaEnvelope className="mr-3" /> Contact Us
            </li>
          </ul>
        </nav>

        {/* Wallet Info */}
        <div className="bg-[#4D9FE0] m-8 px-3 py-3 rounded-full text-xs font-mono text-center">
          0X8cck.....fff
        </div>
      </aside>

      {/* Overlay for closing sidebar on mobile */}
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
