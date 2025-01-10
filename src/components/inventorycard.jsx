import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const InventoryCard = ({ title, initialQuantity = 0 }) => {
  const [quantity, setQuantity] = useState(Number(initialQuantity));
  const [tempQuantity, setTempQuantity] = useState(Number(initialQuantity));

  const handleIncrease = () => {
    setTempQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (tempQuantity > 0) {
      setTempQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      toast.error("Quantity cannot be less than zero!");
    }
  };

  const handleConfirm = () => {
    setQuantity(tempQuantity);
    toast.success('Quantity updated successfully', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden flex max-w-3xl mb-6 hover:shadow-2xl transition-all duration-300">
      <div className="bg-gray-900 p-4 flex items-center justify-center">
        <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center">
          <span className="text-gray-300 text-2xl">📦</span>
        </div>
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-white truncate">{title}</h3>
        <div className="mt-2">
          <div className="flex justify-between text-gray-300">
            <span className="font-medium">Quantity : {tempQuantity}</span>
          </div>
        </div>
        <div className="flex items-center justify-start mt-4 space-x-2">
          <button
            onClick={handleDecrease}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={handleIncrease}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600"
          >
            <Plus size={16} />
          </button>
          {tempQuantity !== quantity && (
            <div className="">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                <Check size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="max-w-2xl mt-4"
      />
    </div>
  );
};

export default InventoryCard;
