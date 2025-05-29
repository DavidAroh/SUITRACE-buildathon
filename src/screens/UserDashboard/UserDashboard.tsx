import React from "react";

interface Order {
  name: string;
  id: string;
  destination: string;
  time: string;
}

export const UserDashboard: React.FC = () => {
  const orders: Order[] = Array(5).fill({
    name: "Dettol cool",
    id: "#AzF2329",
    destination: "Destination 101 trip road bayelsa",
    time: "7:12pm",
  });

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="space-x-6">
          <a href="#" className="hover:underline">Dashboard</a>
          <a href="#" className="underline">Shipments</a>
          <a href="#" className="hover:underline">Tracking</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
        <div className="bg-gray-700 px-4 py-1 rounded-full text-sm">0X8cck....ffr</div>
      </nav>

      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">My Orders</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Product Name</th>
              <th className="p-2">ID number</th>
              <th className="p-2">Destination Address</th>
              <th className="p-2">Timestamp</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className={`border-b ${i === 4 ? "border-2 border-blue-500" : ""}`}>
                <td className="p-2">{order.name}</td>
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.destination}</td>
                <td className="p-2">{order.time}</td>
                <td className="p-2">🔍</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button className="bg-gray-200 px-4 py-2 rounded">prev</button>
          <button className="bg-gray-200 px-4 py-2 rounded">next</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
