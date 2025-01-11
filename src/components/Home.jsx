import React, { useEffect, useState } from "react";
import InventoryCard from "./inventorycard";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { POST_INV_URL, POST_ADD_INV_URL, PUT_EDIT_INV_URL,DELETE_INV_URL } from "../constants";

function Home() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited  
  const [editedQuantity, setEditedQuantity] = useState(""); // Track the edited quantity

  const handleQuantityChange = (item) => {
    setEditingItem(item); // Set the item being edited
    setEditedQuantity(item.qty.toString()); // Pre-fill the input field with the current quantity
  };
  

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewItemName("");
    setNewItemQuantity("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        const authToken = localStorage.getItem("authToken");

        // console.log("email", email);
        // console.log("authToken", authToken);

        if (!email || !authToken) {
          console.error("Email or AuthToken not found in localStorage.");
          return;
        }

        const response = await fetch(POST_INV_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          console.error("Error fetching data:", response.statusText);
          return;
        }

        const result = await response.json();
        setData(result.inventory);
        console.log("Data:", result.inventory);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async () => {
    if (newItemName && newItemQuantity) {
      const email = localStorage.getItem("email");
      const authToken = localStorage.getItem("authToken");

      if (!email || !authToken) {
        console.error("Email or AuthToken not found in localStorage.");
        return;
      }

      const newItem = {
        email,
        itemName: newItemName,
        qty: parseInt(newItemQuantity),
      };

      try {
        const response = await fetch(POST_ADD_INV_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(newItem),
        });

        if (!response.ok) {
          throw new Error("Failed to add item");
        }

        const result = await response.json();
        console.log("Result:", result);

        // Assuming your backend returns the new item in the response
        setData((prevData) => {
          if (Array.isArray(prevData)) {
            // prevData is an array, so we can spread it and add the new item
            return [...prevData, result];
          } else {
            // If prevData is not an array (in case something went wrong), return an array with the result
            return [result];
          }
        });

        handleCloseModal(); // Close modal after successful item addition
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
      } catch (error) {
        console.error("Error adding item:", error);
        toast.error("Failed to Add Item", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error("Please provide item name and quantity", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleEdit = async () => {
    const email = localStorage.getItem("email");
    const authToken = localStorage.getItem("authToken");
  
    if (!email || !authToken) {
      console.error("Email or AuthToken not found in localStorage.");
      return;
    }
  
    if (!editedQuantity || isNaN(editedQuantity) || parseInt(editedQuantity) <= 0) {
      toast.error("Please enter a valid quantity", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  
    const updatedItem = {
      email:localStorage.getItem("email"),
      id: editingItem.id,
      itemName: editingItem.itemName, // Keep the same item name
      qty: parseInt(editedQuantity), // Update the quantity
    };
  
    try {
      const response = await fetch(PUT_EDIT_INV_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedItem),
      });
  
      if (!response.ok) {
        throw new Error("Failed to edit item");
      }
  
      const result = await response.json();
  
      // Update the inventory data with the new quantity
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingItem.id ? { ...item, qty: result.qty } : item
        )
      );
  
      setEditingItem(null);
      setEditedQuantity("");
      toast.success("Item quantity updated successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error editing item:", error);
      toast.error("Failed to edit item", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleInventoryRefresh = () => {
    fetchData(); // Re-fetch inventory list after deletion
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
      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item, index) => (
            <InventoryCard
              key={index}
              itemId={item.id}
              title={item.itemName}
              initialQuantity={item.qty}
              onDelete={handleInventoryRefresh}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No items found in the inventory.</p>
      )}

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
