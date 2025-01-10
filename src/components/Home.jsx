import React, { useState } from "react";
import InventoryCard from "./inventorycard";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const initialData = [
  {
    name: "Apples",
    quantity: 5,
  },
  {
    name: "Bananas",
    quantity: 10,
  },
  {
    name: "Oranges",
    quantity: 7,
  },
];

function Home() {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewItemName("");
    setNewItemQuantity("");
  };

  const handleAddItem = () => {
    if (newItemName && newItemQuantity) {
      const newItem = {
        name: newItemName,
        quantity: parseInt(newItemQuantity),
      };
      setData((prevData) => [...prevData, newItem]);
      handleCloseModal();
      toast.success("Added Item Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="text-white min-h-screen p-6 space-y-4 max-h-screen overflow-y-scroll">
      {/* Title */}
      <div>
        <h1 className="text-5xl font-extrabold text-left text-white mb-6">
          Inventory
        </h1>
      </div>

      {/* Row of buttons */}
      <div className="flex">
        {/* Add item */}
        <button
          onClick={handleAddItemClick}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 flex items-center"
        >
          <Plus size={20} className="mr-2" /> Add Item
        </button>
      </div>

      {/* Inventory Cards */}
      <div className="space-y-4">
        {data.map((item, index) => (
          <InventoryCard
            key={index}
            title={item.name}
            quantity={item.quantity}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80 space-y-4">
            <h3 className="text-xl font-semibold text-white">Add New Item</h3>
            <div>
              <label className="block text-gray-300 mb-1" htmlFor="item-name">
                Item Name
              </label>
              <input
                id="item-name"
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label
                className="block text-gray-300 mb-1"
                htmlFor="item-quantity"
              >
                Item Quantity
              </label>
              <input
                id="item-quantity"
                type="number"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                placeholder="Enter item quantity"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
