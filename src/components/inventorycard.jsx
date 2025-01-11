import { useState, useEffect } from "react";
import { Plus, Minus, Check, Trash, Router } from "lucide-react";
import { toast } from "react-toastify";
import { PUT_EDIT_INV_URL, DELETE_INV_URL } from "../constants";
import { useNavigate } from "react-router"

const InventoryCard = ({ title, initialQuantity = 0, itemId, authToken, onDelete }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [tempQuantity, setTempQuantity] = useState(initialQuantity);
  // console.log("initialQuantity", initialQuantity);
  // console.log("quantity", quantity);
  // console.log("tempQuantity", tempQuantity);
  const navigate = useNavigate();

  // Update state if initialQuantity changes
  useEffect(() => {
    setQuantity(initialQuantity);
    setTempQuantity(initialQuantity);
  }, [initialQuantity]);

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

  const handleConfirm = async () => {
    if (tempQuantity !== quantity) {
      try {
        const updatedItem = {
          email: localStorage.getItem("email"), // Assuming email is stored in localStorage
          id: itemId, // Assuming itemId is passed as a prop
          itemName: title,
          qty: tempQuantity,
        };

        const response = await fetch(PUT_EDIT_INV_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(updatedItem),
        });

        if (!response.ok) {
          throw new Error("Failed to update item");
        }

        const result = await response.json();
        setQuantity(result.qty); // Update the local state with the new quantity
        toast.success("Quantity updated successfully", {
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
        console.error("Error updating item:", error);
        toast.error("Failed to update item", {
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
    }
  };

  // Handle delete request
  const handleDelete = async () => {
    try {
      const deleteItem = {
        email: localStorage.getItem("email"), // Get email from localStorage
        id: itemId, // Pass the item ID to delete
      };

      const response = await fetch(DELETE_INV_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(deleteItem),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      toast.success("Item deleted successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate(0)

    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item", {
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
            <span className="font-medium">Quantity : {tempQuantity} </span>
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
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-400"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
