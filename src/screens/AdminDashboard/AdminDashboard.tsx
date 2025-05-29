import React from "react";

interface OrderRow {
  name: string;
  product: string;
  qty: string;
  orderDate: string;
  dueDate: string;
}

export const AdminDashboard: React.FC = () => {
  const rows: OrderRow[] = Array(9).fill({
    name: "Name",
    product: "Product Ordered",
    qty: "Qty",
    orderDate: "order date",
    dueDate: "due date",
  });

  return (
    <div className="min-h-screen">
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
        <div className="flex justify-around mb-6">
          <div className="bg-white p-4 rounded shadow text-center">
            <p>Products in stock</p>
            <h2 className="text-2xl font-bold">14</h2>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p>Products out of stock</p>
            <h2 className="text-2xl font-bold">2</h2>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded shadow text-center">
            <p>Received Orders</p>
            <h2 className="text-2xl font-bold">9</h2>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p>Reports</p>
            <h2 className="text-2xl font-bold">1</h2>
          </div>
          <button className="bg-white p-4 rounded shadow text-center text-xl">+</button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Product Ordered</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Order Date</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.product}</td>
                <td className="p-2">{item.qty}</td>
                <td className="p-2">{item.orderDate}</td>
                <td className="p-2">{item.dueDate}</td>
                <td className="p-2 flex gap-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Confirmed</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">Rejected</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
