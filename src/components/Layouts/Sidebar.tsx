import { Link } from 'react-router-dom';
import { FaBoxes, FaMapMarkerAlt, FaHeadset } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaBox, FaEnvelope, FaThLarge } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-50 bg-[#373737] text-white flex flex-col">
        <nav className="flex-1 py-4">
          <ul className="space-y-3 mt-11">
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
        <div className=" bg-[#4D9FE0] m-8 px-3 py-3 rounded-full text-xs font-mono text-center">0X8cck.....fff</div>
      </aside>
  );
};

export default Sidebar;
