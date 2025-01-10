import React, { useState } from "react";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

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
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please fill all OTP fields.");
      return;
    }

    if (/[^0-9]/.test(otpValue)) {
      setError("OTP can only contain numbers.");
      return;
    }

    alert(`OTP Submitted: ${otpValue}`);
  };

  return (
    <div className="relative h-screen w-screen bg-cover bg-center" style={{ backgroundImage: 'url("/food-bg4.jpg")' }}>
      {/* Overlay for better visibility of text on the image */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex justify-center items-center h-full w-screen px-4 overflow-x-hidden">
        {/* Ensuring the form container does not overflow on mobile and reducing size */}
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
                style={{
                  color: digit ? 'white' : '#A0AEC0', // Lighter color for empty fields
                }}
              />
            ))}
          </div>

          {/* Display error message */}
          {error && (
            <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>
          )}
          
          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
