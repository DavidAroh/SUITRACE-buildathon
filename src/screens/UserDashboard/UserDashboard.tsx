import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-[#585858] text-white p-6 flex justify-center place-items-center">
        <div className="flex flex-row sm:flex-row sm:items-center sm:space-x-6 text-sm items-center relative w-full max-w-6xl">
          {/* Navigation Links */}
          <div className="flex space-x-6 justify-center text-sm sm:text-base relative left-80">
            <a href="#" className="hover:border-[#4D9FE0]">Dashboard</a>
            <a
              href="#"
              className="px-4 py-1 border border-[#4D9FE0] rounded-full text-white relative bottom-1"
            >
              Shipments
            </a>
            <a href="#" className="border-none border-[#4D9FE0] rounded-full hover:border-[#4D9FE0]">Tracking</a>
            <a href="#" className="hover:border-[#4D9FE0]">Contact Us</a>
          </div>

          {/* Wallet Address */}
          <div className="bg-[#4D9FE0] px-4 py-2 rounded-full text-xs font-mono ml-10 absolute right-1 bottom-1">
            {user?.address
              ? user.address.slice(0, 6) + "..." + user.address.slice(-4)
              : "No wallet"}
          </div>
        </div>
      </nav>



      {/* MAIN CONTENT */}
      <div className="flex-grow px-4 md:px-16 py-8 w-full">
        <h1 className="font-bold mb-6 text-3xl">My Orders</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm">
                <th className="p-4">Product Name</th>
                <th className="p-4">ID number</th>
                <th className="p-4">Destination Address</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className={`text-base font-lg mt-5 ${i % 2 === 0 ? "bg-[#D9D9D9]" : "bg-[#F7F7F7]"}`}>
                  <td className="p-4">{order.name}</td>
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.destination}</td>
                  <td className="p-4">{order.time}</td>
                  <td className="p-4">
                    <div className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200">
                      🔍
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <button className="bg-gray-200 px-6 py-2 rounded text-sm">prev</button>

          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
          </div>

          <button className="bg-gray-200 px-6 py-2 rounded text-sm">next</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
