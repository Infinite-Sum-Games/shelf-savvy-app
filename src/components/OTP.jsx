import React, { useState } from "react";
import { OTP_URL } from "../constants";
const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      return; // Only allow digits
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < otp.length - 1 && value) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    setError("");
    setSuccessMessage(""); // Clear the success message when the user changes OTP
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please fill all OTP fields.");
      setSuccessMessage(""); 
      return;
    }
  
    if (/[^0-9]/.test(otpValue)) {
      setError("OTP can only contain numbers.");
      setSuccessMessage(""); 
      return;
    }
  
    setLoading(true);
    setError(""); // Clear errors before making the API call
    setSuccessMessage("");
  
    // Retrieve username and email from localStorage
    const username = localStorage.getItem("UserName");
    const email = localStorage.getItem("Email");
  
    try {
      console.log({ otpValue, username, email }); // Log the values being sent
      const response = await fetch(OTP_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email,otp:otpValue}), // Include username and email in the POST body
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "OTP verification failed");
      }
  
      const data = await response.json();
      setSuccessMessage("OTP Verified Successfully!");
      setError(""); 
      // Optionally handle any response data here (e.g., set authToken)
      window.location.href = "/";  // Redirect to another page (e.g., Home)
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="relative h-screen w-screen bg-cover bg-center" style={{ backgroundImage: 'url("/food-bg4.jpg")' }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex justify-center items-center h-full w-screen px-4 overflow-x-hidden">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md sm:max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Enter OTP</h2>

          {/* OTP input fields */}
          <div className="flex justify-center space-x-4 mb-6 sm:space-x-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit} // Empty value when there's no digit
                onChange={(e) => handleChange(e, index)}
                className="w-10 h-10 text-center text-lg font-semibold border-2 border-gray-500 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
              />
            ))}
          </div>

          {/* Display error message */}
          {error && (
            <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>
          )}

          {/* Display success message */}
          {successMessage && (
            <p className="text-green-500 text-center mb-4 animate-pulse">{successMessage}</p>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading} // Disable button during loading
            className={`w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            } transition duration-300 ease-in-out transform hover:scale-105`}
          >
            {loading ? "Submitting..." : "Submit OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
