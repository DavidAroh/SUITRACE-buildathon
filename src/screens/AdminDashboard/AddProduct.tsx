import React from "react";
import { FiBell, FiShare2, FiCopy } from "react-icons/fi";
import { Link } from 'react-router-dom';

export const AddProduct: React.FC = () => {
    return (
        <div className="flex min-h-screen ">
            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Top bar */}
                <div className="flex justify-between items-center mb-6 bg-white w-full px-6 py-4">
                    <h1 className="text-xl font-semibold">Add Product</h1>
                    <div className="flex items-center gap-4">
                        <FiBell size={20} />
                        <button className="border px-4 py-2 rounded">Export CSV</button>
                    </div>
                </div>

                {/* Form & QR Section */}
                <div className="flex gap-6 p-6">
                    {/* Form */}
                    <div className="flex-1 bg-white shadow rounded-lg p-6 max-w-xl">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1 font-medium">Product Name</label>
                                <select className="w-full border rounded px-3 py-2 text-sm">
                                    <option>Select product</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1 font-medium">Product Origin</label>
                                <input className="w-full border rounded px-3 py-2 text-sm" type="text" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 font-medium">Batch Number</label>
                                <input className="w-full border rounded px-3 py-2 text-sm" type="text" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 font-medium">Harvest Date</label>
                                <input className="w-full border rounded px-3 py-2 text-sm" type="date" />
                            </div>
                            <div className="flex justify-center gap-2">
                                <button
                                    type="button"
                                    className="bg-green-500 text-white text-sm px-4 py-2 mt-4 align-center"
                                >
                                    Save and generate tracking ID
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* QR Code Panel */}
                    <div className="w-80 bg-white shadow rounded-lg p-6 flex flex-col items-center justify-between">
                        <div className="w-48 h-48 bg-gray-200 text-gray-500 flex items-center justify-center rounded">
                            QR CODE
                        </div>
                        <button className="flex items-center gap-2 text-sm mt-2">
                            <FiShare2 /> Share
                        </button>
                        <hr className="w-full my-4" />
                        <div className="text-sm w-full text-center">
                            <p className="mb-1">Tracking Id</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                                    FD123122REDD
                                </span>
                                <FiCopy className="text-gray-600 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Button */}
                <div className="mt-10 px-38 mb-6 flex justify-center">
                    <Link to="/admin/updateproduct" className="w-96">
                        <button className="bg-white border px-6 py-3 rounded-lg shadow text-center text-sm w-2/3 ">
                        Start Product Tracking
                        </button>
                    </Link>
        </div>
      </main >
    </div >
  );
};

export default AddProduct;
