import React, { useState } from "react";
import { Trophy, Clipboard, Package, Tag, Copy } from "lucide-react";
import { PROFILE_URL } from "../constants";
import { useEffect } from "react";

const ProfilePage = () => {
    const [user, setUser] = useState({}); // Initial state set to null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchUserData = async () => {
        try {
            const email = localStorage.getItem("email"); // Get email from local storage
            const token = localStorage.getItem("authToken"); // Get token from local storage
            if (!email) throw new Error("Email not found in local storage");
            if (!token) throw new Error("Authorization token not found in local storage");
    
            const response = await fetch(PROFILE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Add Bearer token to headers
                },
                body: JSON.stringify({ email }), // Send email in request body
            });
    
            // Check if the response status is OK (200)
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server Error:", errorText);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                setUser(data.data); 
                console.log(data)
                console.log("User"+user)
                console.log("Email: " + (user.email || "Email not available"));
                


            } else {
                const text = await response.text(); // Log raw response
                console.error("Response is not JSON, received:", text);
                throw new Error("Response is not JSON");
            }
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
      useEffect(() => {
        fetchUserData();
      }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Referral Code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-2 max-h-[90vh] overflow-y-scroll">
      {/* Check if user is loaded */}
      {user ? (
        <>
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-lg shadow-lg text-white flex items-center space-x-6">
            <img
              src={user.profilePictureURL || "/default-profile.jpg"} // Fallback image
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-white"
            />
            <div>
              <h1 className="text-3xl font-semibold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm">{user.email}</p>
              <p className="text-sm font-semibold">Points : {user.totalPoints}</p>
              <div className="mt-1 flex items-center space-x-2">
                <p className="text-sm">Referral Code: {user.myReferralCode}</p>
                <button
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm"
                  onClick={() => copyToClipboard(user.myReferralCode)}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
  
          {/* Achievements */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Trophy size={20} className="text-yellow-500" />
              <span>Achievements</span>
            </h2>
            <div className="mt-4 space-y-2">
              {user.Achivements?.map((Achievements) => (
                <div
                  key={Achievements.id}
                  className="bg-gray-100 rounded-lg p-4 flex items-center space-x-2"
                >
                  <div className="flex-shrink-0">
                    <Trophy size={20} className="text-yellow-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm text-gray-700">{Achievements.badge}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(Achievements.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Food Donations */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Clipboard size={20} className="text-green-500" />
              <span>Food Donations</span>
            </h2>
            <div className="mt-4 space-y-4">
              {user.FoodDonation?.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                  <div>
                    <p className="text-sm text-gray-700">
                      Content: {donation.content}
                    </p>
                    <p className="text-xs text-gray-400">
                      Status: {donation.approval ? "Approved" : "Pending"}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    Received: {donation.receivedFood ? "Yes" : "No"}
                  </span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Referrals */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Tag size={20} className="text-teal-500" />
              <span>Referrals</span>
            </h2>
            <div className="mt-4 space-y-4">
              {user.Referrals?.map((referral) => (
                <div key={referral.id} className="p-4 border-b border-gray-200">
                  <p className="text-sm text-gray-700">
                    Referred User: {referral.joineeId}
                  </p>
               
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div> // Show loading while user data is being fetched
      )}
    </div>
  );
  
};

export default ProfilePage;
