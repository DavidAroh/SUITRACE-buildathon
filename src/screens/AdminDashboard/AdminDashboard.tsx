import React from "react";
import { FiBell } from "react-icons/fi";
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const rows = Array(9).fill({
    product: "Product Ordered",
    qty: "Qty",
    orderDate: "order date",
    dueDate: "due date",
  });

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <main className="flex-1">
        {/* Topbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 border-b bg-white gap-4 sm:gap-0">
          <h1 className="text-lg sm:text-xl font-semibold">Products</h1>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <FiBell size={20} />
            <button className="border px-3 py-1 rounded text-sm">Export CSV</button>
            <Link to="/admin/addproduct">
              <button className="bg-gray-800 text-white px-4 py-1.5 text-sm rounded">+ Add Product</button>
            </Link>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 bg-white rounded-lg mt-4 mx-4 sm:mx-8 gap-4">
          <div className="flex gap-4 text-sm border-b w-full sm:w-auto">
            <button className="border-b-2 border-black font-semibold pb-1">All</button>
            <button className="text-black-500 hover:text-black">Pending</button>
            <button className="text-gray-500 hover:text-black">Completed</button>
            <button className="text-gray-500 hover:text-black">Archived</button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 w-full sm:w-auto text-sm"
            />
            <button className="border px-3 py-1 rounded text-sm">Sort</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4 px-4">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 whitespace-nowrap">Product</th>
                <th className="p-2 whitespace-nowrap">Qty</th>
                <th className="p-2 whitespace-nowrap">Order Date</th>
                <th className="p-2 whitespace-nowrap">Due Date</th>
                <th className="p-2 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item, i) => (
                <tr
                  key={i}
                  className={`text-sm sm:text-base ${i % 2 === 0 ? "bg-[#D9D9D9]" : "bg-[#F7F7F7]"}`}
                >
                  <td className="p-3 whitespace-nowrap">{item.product}</td>
                  <td className="p-3 whitespace-nowrap">{item.qty}</td>
                  <td className="p-3 whitespace-nowrap">{item.orderDate}</td>
                  <td className="p-3 whitespace-nowrap">{item.dueDate}</td>
                  <td className="p-3 whitespace-nowrap">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 sm:px-6 py-6">
          {[
            { label: "Products in stock", value: 14 },
            { label: "Products out of stock", value: 2 },
            { label: "Received Orders", value: 9, color: "bg-blue-500 text-white" },
            { label: "Reports", value: 1 },
            { label: "Reports", value: "+" },
          ].map((card, i) => (
            <div
              key={i}
              className={`p-4 rounded shadow flex justify-between items-center ${card.color || "bg-white"}`}
            >
              <p className="text-sm w-24">{card.label}</p>
              <h2 className="text-2xl font-bold">{card.value}</h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
