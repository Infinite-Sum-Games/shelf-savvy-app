import React from "react";
import InventoryCard from "./inventorycard";
import { Plus } from "lucide-react";

const data = [
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
  return (
    <div className="flex flex-col p-6 space-y-4">
      {/* Title */}
      <div>
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#faff1f] mb-2">
        My Inventory
      </h1>
      </div>

      {/* Row of buttons */}
      <div className="flex">
        {/* Add item */}
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 flex items-center">
          <Plus size={20} className="mr-2"/> Add Item
        </button>
      </div>

      {/* Inventory Cards */}
      <div>
        {data.map((item, index) => (
          <InventoryCard
            key={index}
            title={item.name}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
