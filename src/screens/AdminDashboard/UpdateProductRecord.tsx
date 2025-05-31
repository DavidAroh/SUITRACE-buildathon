import React, { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { FaQrcode, FaPlus } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export const UpdateProductRecord: React.FC = () => {
  const location = useLocation();
  const [trackingId, setTrackingId] = useState('FD1231222REDD');
  const [productDetails, setProductDetails] = useState({
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

  // Get state from navigation
  useEffect(() => {
    if (location.state) {
      const state = location.state as any;
      if (state.trackingId) {
        setTrackingId(state.trackingId);
      }
      if (state.productDetails) {
        setProductDetails(state.productDetails);
      }
    }
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50"> 
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 bg-white gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-xl font-semibold">Update Product Record</h1>
        <div className="flex items-center gap-3">
          <FiBell size={20} />
          <button className="border px-3 py-1 rounded text-sm">Export Product Record</button>
        </div>
      </header>

      {/* Tracking ID Input */}
      <div className="px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <label className="font-semibold text-sm">Input Tracking Id</label>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-full sm:w-60"
          />
          <FaQrcode className="text-gray-700" />
        </div>
      </div>

      {/* Product Details */}
      <div className="px-4">
        <div className="bg-white p-4 sm:p-6 rounded shadow w-full max-w-2xl mx-auto">
          <h2 className="font-bold mb-4 text-lg">Product Details</h2>
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium">Harvest Date</label>
              <input className="w-full border p-2 rounded" value={productDetails.harvest} readOnly />
            </div>
            <FaPlus className="text-gray-700 mt-2 sm:mt-6" />
          </div>
        </div>
      </div>

      {/* Author Details */}
      <div className="px-4 py-4">
        <div className="bg-white p-4 sm:p-6 rounded shadow w-full max-w-2xl mx-auto">
          <h2 className="font-bold mb-4 text-lg">Author Details</h2>
          <p><strong>Name:</strong> {authorDetails.name}</p>
          <p><strong>Role:</strong> {authorDetails.role}</p>
          <p><strong>Description:</strong> {authorDetails.description}</p>
          <p><strong>Time/Date:</strong> {authorDetails.time}</p>
          <p><strong>Email/Tel no:</strong> {authorDetails.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductRecord;