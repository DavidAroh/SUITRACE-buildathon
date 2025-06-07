import React, { useState } from "react";
import {
  FiBox,
  FiGrid,
  FiMapPin,
  FiPhoneCall,
  FiPlus,
  FiBarChart2,
} from "react-icons/fi";
import PostProductModal from "./PostProductModal"; // make sure this file exists

const statusStyles = {
  Completed: "bg-green-500",
  Pending: "bg-yellow-500",
  Processing: "bg-blue-500",
};

const recentOrders = [
  { id: "#R3122", customer: "Fredy", product: "Sofa", amount: "$234", status: "Completed" },
  { id: "#DD343", customer: "Daniel", product: "Microwave", amount: "$180", status: "Pending" },
  { id: "#RE444", customer: "Sarah", product: "Refrigerator", amount: "$899", status: "Processing" },
];

export const AdminDashboard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-screen text-white font-sans overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Add Product Modal */}
        {isModalOpen && (
          <PostProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2B2B2B] p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <FiPlus className="text-green-400" />
              Add New Product
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Quickly add a new product to your store
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded text-sm"
            >
              Add Product
            </button>
          </div>
          <div className="bg-[#2B2B2B] p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <FiBarChart2 className="text-green-400" />
              View Analytics
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Check store analytics and monitor performance
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded text-sm">
              View Report
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-[#2B2B2B] p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text- font-semibold">Recent Orders</h2>
            <button className="text-green-400 text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-600">
                  <th className="pb-2">Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={i} className="border-b border-gray-700 last:border-0">
                    <td className="py-3">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span
                        className={`text-white text-xs px-2 py-1 rounded-full ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#2B2B2B] rounded-xl p-5 shadow-md flex flex-col gap-1">
            <p className="text-sm text-gray-300">Total Sales</p>
            <h2 className="text-3xl font-bold">$12,344</h2>
            <p className="text-green-500 text-sm">+102% from last month</p>
          </div>
          <div className="bg-[#2B2B2B] rounded-xl p-5 shadow-md flex flex-col gap-1">
            <p className="text-sm text-gray-300">Total Orders</p>
            <h2 className="text-3xl font-bold">2,115</h2>
            <p className="text-green-500 text-sm">+12% from last month</p>
          </div>
          <div className="bg-[#2B2B2B] rounded-xl p-5 shadow-md flex flex-col gap-1">
            <p className="text-sm text-gray-300">Total Products</p>
            <h2 className="text-3xl font-bold">67</h2>
            <p className="text-pink-500 text-sm">+9 new products</p>
          </div>
          <div className="bg-[#2B2B2B] rounded-xl p-5 shadow-md flex flex-col gap-1">
            <p className="text-sm text-gray-300">Total Customers</p>
            <h2 className="text-3xl font-bold">19</h2>
            <p className="text-orange-400 text-sm">+3 new customers</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
