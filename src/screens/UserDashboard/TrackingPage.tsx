import React from 'react';

export const TrackingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans px-4 py-6">
      {/* Search */}
      <div className="flex justify-center">
        <div className="flex items-center px-4 py-2 rounded-full w-full max-w-md shadow-md mt-4 bg-[#F7F7F7]">
          <input
            type="text"
            placeholder="asdr123233hjtt"
            className="bg-transparent flex-grow outline-none px-2 text-sm"
          />
          <button>
            <img
              src="https://img.icons8.com/ios-glyphs/30/qr-code.png"
              alt="QR"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-8 mt-10">
        {/* Product Card */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-6 rounded-xl w-full md:w-[400px] shadow-lg">
          <p className="mb-2 text-sm md:text-base"><strong>Product Name:</strong> Fermented Sugar Solution</p>
          <p className="mb-2 text-sm md:text-base"><strong>Product Id:</strong> ASDR123233HJTT</p>
          <p className="mb-2 text-sm md:text-base">
            <strong>Product Description:</strong><br />
            <span className="text-sm">
              Fermented sugar solution is a liquid product resulting from the breakdown of sugars by yeast or bacteria, producing compounds like ethanol, acids, or carbon dioxide. It’s used in various applications, including food, beverages, and industrial processes.
            </span>
          </p>
          <p className="mb-2 text-sm md:text-base"><strong>Product Specifications:</strong></p>
          <ul className="text-sm ml-4 list-disc space-y-1">
            <li><strong>Composition:</strong> Sugar, water, yeast or bacteria (depending on the fermentation type)</li>
            <li><strong>Fermentation Type:</strong> Can be alcoholic (yeast-based) or lactic acid (bacteria-based)</li>
            <li><strong>pH Level:</strong> Varies depending on the fermentation process and intended use</li>
          </ul>
        </div>

        {/* Tracking Card */}
        <div className="bg-blue-900 text-white p-6 rounded-xl w-full md:w-[300px] shadow-lg flex flex-col items-center">
          <div className="flex flex-col items-start space-y-10">
            <TrackingStep label="Factory/Store" active />
            <TrackingStep label="Distributor" />
            <TrackingStep label="Shipped" />
            <TrackingStep label="on it's way to your doorstep" />
          </div>
          <button className="mt-10 bg-white text-blue-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 text-sm md:text-base text-center w-full">
            View delivery via Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

interface TrackingStepProps {
  label: string;
  active?: boolean;
}

const TrackingStep: React.FC<TrackingStepProps> = ({ label, active }) => (
  <div className="flex items-center space-x-3 relative">
    <div
      className={`w-4 h-4 rounded-full border-2 ${
        active ? 'bg-white border-white' : 'border-white'
      }`}
    />
    <span className="text-sm">{label}</span>
    <div className="absolute -left-1 top-5 h-8 w-px bg-white mr-24" />
  </div>
);

export default TrackingPage;
