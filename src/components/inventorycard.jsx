import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";

const InventoryCard = ({ title, initialQuantity = 0 }) => {
  const [quantity, setQuantity] = useState(Number(initialQuantity));
  const [tempQuantity, setTempQuantity] = useState(Number(initialQuantity));

  const handleIncrease = () => {
    setTempQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (tempQuantity > 0) {
      setTempQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleConfirm = () => {
    setQuantity(tempQuantity);
    notify();
  };

  const notify = () => toast("Successfully updated quantity!");

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex max-w-3xl mb-6 hover:shadow-2xl transition-all duration-300">
      <div className="bg-gray-100 p-4 flex items-center justify-center">
        <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-2xl">📦</span>
        </div>
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <div className="mt-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Quantity:</span>
            <span>{tempQuantity}</span>
          </div>
        </div>
        <div className="flex items-center justify-start mt-4 space-x-2">
          <button
            onClick={handleDecrease}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={handleIncrease}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
          >
            <Plus size={16} />
          </button>
          {tempQuantity !== quantity && (
            <div className="">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-400"
              >
                <Check size={16}/>
              </button>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
