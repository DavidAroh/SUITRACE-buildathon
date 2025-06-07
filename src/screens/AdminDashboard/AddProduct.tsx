import React, { useState, useEffect } from "react";
import { FiBell, FiShare2, FiCopy, FiCheck } from "react-icons/fi";
import QRCode from "react-qr-code";
import { Link, useNavigate } from 'react-router-dom';

// Mock contract service
const mockContractService = {
  createProductBatch: async (batchId: string, location: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`0xDEMO-${Math.random().toString(36).substring(2, 15)}`);
      }, 1000);
    });
  },
  isAuthenticated: () => true
};

const FORM_DATA_KEY = 'addProductFormData';

export const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    origin: "",
    batchNumber: "",
    harvestDate: ""
  });
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem(FORM_DATA_KEY);
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (e) {
        console.error('Failed to parse saved form data', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.batchNumber || !formData.origin) {
      setError("Batch number and origin are required");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const txDigest = await mockContractService.createProductBatch(
        formData.batchNumber,
        formData.origin
      );
      setTrackingId(txDigest);
      setFormData({ productName: "", origin: "", batchNumber: "", harvestDate: "" });
      localStorage.removeItem(FORM_DATA_KEY);
    } catch (err: any) {
      console.error('Failed to create product batch:', err);
      setError("Demo error: Product creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-6 bg-white w-full px-6 py-4">
          <h1 className="text-xl font-semibold">Add Product</h1>
          <div className="flex items-center gap-4">
            <FiBell size={20} />
            <button className="border px-4 py-2 rounded">Export CSV</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
          {/* Form */}
          <div className="flex-1 bg-white shadow rounded-lg p-6 max-w-xl">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1 font-medium">Product Name</label>
                <select
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  <option value="">Select product</option>
                  <option value="Sugar">Sugar</option>
                  <option value="Cocoa">Cocoa</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Palm Oil">Palm Oil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">Product Origin</label>
                <input
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  type="text"
                  placeholder="Enter origin location"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">Batch Number</label>
                <input
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  type="text"
                  placeholder="Enter batch number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">Harvest Date</label>
                <input
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  type="date"
                />
              </div>

              {error && <div className="text-red-500 text-sm py-2">{error}</div>}

              <div className="flex justify-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-green-500 text-white text-sm px-4 py-2 mt-4 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-600'
                  }`}
                >
                  {isSubmitting ? 'Creating product...' : 'Save and generate tracking ID'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ productName: "", origin: "", batchNumber: "", harvestDate: "" });
                    localStorage.removeItem(FORM_DATA_KEY);
                  }}
                  className="bg-gray-200 text-gray-700 text-sm px-4 py-2 mt-4 hover:bg-gray-300"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          {/* QR Code Panel */}
          <div className="w-80 bg-white shadow rounded-lg p-6 flex flex-col items-center justify-between">
            {trackingId ? (
              <>
                <div className="bg-white p-2 rounded">
                  <QRCode value={`${window.location.origin}/track/${trackingId}`} size={128} />
                </div>
                <button
                  onClick={() => navigator.share({
                    title: 'Product Tracking',
                    text: `Track this product: ${trackingId}`,
                    url: `${window.location.origin}/track/${trackingId}`
                  })}
                  className="flex items-center gap-2 text-sm mt-2"
                >
                  <FiShare2 /> Share
                </button>
                <hr className="w-full my-4" />
                <div className="text-sm w-full text-center">
                  <p className="mb-1">Tracking Id</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm truncate max-w-[150px]">
                      {trackingId.slice(0, 8)}...{trackingId.slice(-8)}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-gray-500">
                    DEMO: This would be stored on the blockchain in production
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-48 h-48 bg-gray-100 text-gray-500 flex items-center justify-center rounded">
                  <div className="text-center">
                    <div className="bg-gray-300 w-32 h-32 mx-auto mb-2"></div>
                    <p className="text-xs">Tracking ID will appear here</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm mt-2 opacity-50 cursor-not-allowed">
                  <FiShare2 /> Share
                </button>
                <hr className="w-full my-4" />
                <div className="text-sm w-full text-center">
                  <p className="mb-1">Tracking Id</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      Not generated
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation button */}
        {trackingId && (
          <div className="mt-10 px-4 mb-6 flex justify-center">
            <Link
              to="/admin/updateproduct"
              state={{
                trackingId,
                productDetails: {
                  name: formData.productName || "Not specified",
                  origin: formData.origin || "Not specified",
                  batch: formData.batchNumber || "Not specified",
                  harvest: formData.harvestDate
                    ? new Date(formData.harvestDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Not specified',
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Proceed to Update Product Info
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
export default AddProduct;