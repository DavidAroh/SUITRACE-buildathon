import React, { useState } from "react";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";

interface PostProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostProductModal: React.FC<PostProductModalProps> = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-[#f2f2f2] w-[360px] rounded-lg p-4 shadow-md relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
          <FiX size={20} />
        </button>

        {/* Upload Photo Area */}
        <div className="w-full h-40 bg-white border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm mb-4 cursor-pointer">
          Upload Photo
        </div>

        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          className="w-full mb-3 px-3 py-2 rounded border border-gray-300 text-sm text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* Product Description */}
        <textarea
          placeholder="Product Description"
          rows={3}
          className="w-full mb-3 px-3 py-2 rounded border border-gray-300 text-sm text-black bg-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* Quantity and Price Row */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-black">Qty:</span>
          <button onClick={handleDecrement} className="bg-white border px-2 py-1 rounded text-black">
            <FiMinus size={14} />
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="w-10 border px-2 py-1 rounded text-black text-sm"
          />
          <button onClick={handleIncrement} className="bg-white border px-2 py-1 rounded text-black">
            <FiPlus size={14} />
          </button>

          <input
            type="text"
            placeholder="Price"
            className="flex-1 px-0 py-2 rounded border border-gray-300 text-sm text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-white text-black font-semibold py-2 rounded border border-gray-300 hover:bg-gray-100">
          Post Product
        </button>
      </div>
    </div>
  );
};

export default PostProductModal;
