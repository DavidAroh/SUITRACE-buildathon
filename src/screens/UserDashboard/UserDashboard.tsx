import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface Order {
  name: string;
  id: string;
  destination: string;
  time: string;
}

interface User {
  address?: string;
  name?: string;
  email?: string;
  role?: "user" | "admin";
}

export const UserDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/user/dashboard");
      return;
    }

    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role === "admin") {
      navigate("/admin/dashboard");
      return;
    }

    const mockOrders: Order[] = Array(6).fill({
      name: "Dettol cool",
      id: "#AzF2329",
      destination: "Destination 101 trip road bayelsa",
      time: "7:12pm",
    });

    setOrders(mockOrders);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-auto">
      <div className="flex-grow px-4 sm:px-6 md:px-12 py-8 w-full">
        <h1 className="font-bold mb-6 text-2xl sm:text-3xl">My Orders</h1>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 sm:p-4">Product Name</th>
                <th className="p-3 sm:p-4">ID Number</th>
                <th className="p-3 sm:p-4">Destination Address</th>
                <th className="p-3 sm:p-4">Timestamp</th>
                <th className="p-3 sm:p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className={`font-medium ${i % 2 === 0 ? "bg-[#D9D9D9]" : "bg-[#F7F7F7]"}`}>
                  <td className="p-3 sm:p-4">{order.name}</td>
                  <td className="p-3 sm:p-4">{order.id}</td>
                  <td className="p-3 sm:p-4">{order.destination}</td>
                  <td className="p-3 sm:p-4">{order.time}</td>
                  <td className="p-3 sm:p-4">
                    <Link to="/user/tracking">
                      <div className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200">
                        🔍
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <button className="bg-gray-200 px-5 py-2 rounded text-sm hover:bg-gray-300 transition">Prev</button>

          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
          </div>

          <button className="bg-gray-200 px-5 py-2 rounded text-sm hover:bg-gray-300 transition">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
