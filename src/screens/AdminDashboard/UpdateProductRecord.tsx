import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { FaQrcode, FaPlus } from 'react-icons/fa';

export const UpdateProductRecord: React.FC = () => {
  const [trackingId, setTrackingId] = useState('FD1231222REDD');
  const [productDetails] = useState({
    name: 'hghddddddddddddddj',
    origin: 'abakaliki',
    batch: 'A6f123',
    harvest: '27th may 2025 / 10:24am',
  });

  const [authorDetails] = useState({
    name: 'Frank George Idowu',
    role: 'Producer',
    description: 'Produce left the farm to the packaging department',
    time: '12:30pm / 30-May-2025',
    contact: 'frankidowu2@gmail.com / 09042165622345',
  });

  return (
    <div className="flex min-h-screen"> 
      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <header className="flex justify-between items-center px-6 py-4 bg-white">
          <h1 className="text-xl font-semibold">Update Product Record</h1>
          <div className="flex items-center gap-4">
            <FiBell size={20} />
            <button className="border px-4 py-2 rounded">Export Product Record</button>
          </div>
        </header>

        {/* Tracking ID Input */}
        <div className="px-6 py-4 flex items-center gap-4">
          <label className="font-semibold text-sm">Input Tracking Id</label>
          <input
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="border rounded px-3 py-1 text-sm w-60"
          />
          <FaQrcode className="text-gray-700" />
        </div>

        {/* Product Details */}
        <div className="px-6">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl">
            <h2 className="font-bold mb-4">Product Details</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium">Product Name</label>
              <input className="w-full border p-2 rounded" value={productDetails.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Product Origin</label>
              <input className="w-full border p-2 rounded" value={productDetails.origin} readOnly />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Batch Number</label>
              <input className="w-full border p-2 rounded" value={productDetails.batch} readOnly />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium">Harvest Date</label>
                <input className="w-full border p-2 rounded" value={productDetails.harvest} readOnly />
              </div>
              <FaPlus className="mt-6 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Author Details */}
        <div className="px-6 py-4">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl">
            <h2 className="font-bold mb-4">Author Details</h2>
            <p><strong>Name:</strong> {authorDetails.name}</p>
            <p><strong>Role:</strong> {authorDetails.role}</p>
            <p><strong>Description:</strong> {authorDetails.description}</p>
            <p><strong>Time/Date:</strong> {authorDetails.time}</p>
            <p><strong>Email/Tel no:</strong> {authorDetails.contact}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateProductRecord;
