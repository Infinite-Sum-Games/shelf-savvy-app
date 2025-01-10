import React from 'react';
import InventoryCard from './inventorycard';

const data = [
  {
    name: 'Apples',
    quantity: 5,
  },
  {
    name: 'Bananas',
    quantity: 10,
  },
  {
    name: 'Oranges',
    quantity: 7,
  }
]

function Home() {
  return (
  <div className='flex flex-col p-6 space-y-6'>
    {/* Title */}
    <div>
      <h1 className="text-3xl font-semibold text-gray-200 mb-6">My Inventory</h1>
    </div>

    {/* Row of buttons */}
    <div className='flex flex-row-reverse'>
      {/* Add item */}
      <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">
        Add Item
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
    <div></div>
  </div>
  )
}

export default Home;