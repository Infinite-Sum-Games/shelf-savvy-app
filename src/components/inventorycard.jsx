import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const InventoryCard = ({ title, initialQuantity = 0 }) => {
  const [quantity, setQuantity] = useState(Number(initialQuantity));

  // Function to handle increasing the quantity
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to handle decreasing the quantity (with a minimum limit of 0)
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex max-w-3xl mb-6 hover:shadow-2xl transition-all duration-300">
      {/* Left Section - Image or Icon */}
      <div className="bg-gray-100 p-4 flex items-center justify-center">
        <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-2xl">📦</span>
        </div>
      </div>

      {/* Right Section - Content */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Header */}
        <h3 className="text-xl font-semibold text-gray-800 truncate">{title}</h3>

        {/* Body */}
        <div className="mt-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Quantity:</span>
            <span>{quantity}</span>
          </div>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center justify-start mt-4 space-x-2">
          <button
            onClick={handleDecrease}  // Corrected here
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={handleIncrease}  // Corrected here
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
