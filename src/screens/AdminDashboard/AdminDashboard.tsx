import React from "react";
import { FiBell } from "react-icons/fi";
import { Link } from 'react-router-dom';
// import { FaBox, FaMapMarkerAlt, FaEnvelope, FaThLarge } from "react-icons/fa";

export const AdminDashboard: React.FC = () => {
  const rows = Array(9).fill({
    product: "Product Ordered",
    qty: "Qty",
    orderDate: "order date",
    dueDate: "due date",
  });

  return (
    <div className="flex min-h-screen font-sans overflow-auto">
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 ">
        {/* Topbar */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white ">
          <h1 className="text-xl font-semibold">Products</h1>
          <div className="flex items-center gap-4">
            <FiBell size={20} />
            <button className="border px-4 py-2 rounded">Export CSV</button>
            <Link to="/admin/addproduct" ><button className="bg-gray-800 text-white px-4 py-2 rounded">+ Add Product</button></Link>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-wrap justify-between items-center px-6 py-4 border-b bg-white rounded-lg m-8 w-90">
          <div className="flex gap-5 text-sm border-b-1 border-black">
            <button className="border-b-2 border-black pb-1 font-semibold">All</button>
            <button className="text-gray-500 hover:text-black">Pending</button>
            <button className="text-gray-500 hover:text-black">Completed</button>
            <button className="text-gray-500 hover:text-black">Archived</button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm"
            />
            <button className="border px-3 py-1 rounded text-sm">Sort</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-1 py-4">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Order Date</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item, i) => (
                <tr key={i} className={`text-base font-lg mt-5 ${i % 2 === 0 ? "bg-[#D9D9D9]" : "bg-[#F7F7F7]"}`}>
                  <td className="p-3">{item.product}</td>
                  <td className="p-3">{item.qty}</td>
                  <td className="p-3">{item.orderDate}</td>
                  <td className="p-3">{item.dueDate}</td>
                  <td className="p-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 px-6 py-4 font-[Inter]">
          <div className="bg-white p-4 rounded shadow text-center flex flex-row items-center gap-2">
            <p className="text-sm w-20 text-left">Products in stock</p>
            <h2 className="text-2xl font-bold">14</h2>
          </div>
          <div className="bg-white p-7 rounded shadow text-center flex flex-row items-center gap-2">
            <p className="text-sm w-20 text-left">Products out of stock</p>
            <h2 className="text-2xl font-bold">2</h2>
          </div>
          <div className="bg-blue-500 text-white p-7 rounded shadow text-center flex flex-row items-center gap-2">
            <p className="text-sm w-20 text-left">Received Orders</p>
            <h2 className="text-2xl font-bold">9</h2>
          </div>
          <div className="bg-white p-7 rounded shadow text-center flex flex-row items-center gap-2">
            <p className="text-sm w-20 text-left">Reports</p>
            <h2 className="text-2xl font-bold">1</h2>
          </div>
          <div className="bg-white p-7 rounded shadow text-center flex flex-row items-center gap-2">
            <p className="text-sm w-20 text-left">Reports</p>
            <h2 className="text-2xl font-bold">+</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
