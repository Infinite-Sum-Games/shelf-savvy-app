import React, { useState } from "react";
import { Trophy, Clipboard, Package, Tag, Copy } from "lucide-react";

// Mock user data (for testing purposes)
const mockUserData = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe123",
  email: "johndoe@example.com",
  profilePictureURL: "https://randomuser.me/api/portraits/men/1.jpg",
  myReferralCode: "XYZ123",
  streak: 5,
  achievements: [
    { id: 1, badge: "NewRecruit", createdAt: "2024-12-01T10:00:00Z" },
    {
      id: 2,
      badge: "LeaderboardChallenger",
      createdAt: "2024-12-15T14:00:00Z",
    },
    { id: 3, badge: "RecipeMaster", createdAt: "2025-01-05T08:00:00Z" },
  ],
  foodDonations: [
    {
      id: 1,
      content: "5 kg of rice",
      approval: true,
      receivedFood: true,
      receiverBankId: "abc123",
    },
    {
      id: 2,
      content: "10 cans of beans",
      approval: false,
      receivedFood: false,
      receiverBankId: "xyz456",
    },
  ],
  totalPoints: 250,
  points: [
    { id: 1, point: 50, createdAt: "2025-01-01T10:00:00Z" },
    { id: 2, point: 100, createdAt: "2025-01-05T14:00:00Z" },
    { id: 3, point: 100, createdAt: "2025-01-09T08:00:00Z" },
  ],
  referrals: [
    { id: 1, joineeId: "jane123", referralCode: "ABC123" },
    { id: 2, joineeId: "jack456", referralCode: "DEF456" },
  ],
};

const ProfilePage = () => {
  const [user, setUser] = useState(mockUserData);

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
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-lg shadow-lg text-white flex items-center space-x-6">
        <img
          src={user.profilePictureURL || "/default-profile.jpg"}
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
          {user.achievements?.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gray-100 rounded-lg p-4 flex items-center space-x-2"
            >
              <div className="flex-shrink-0">
                <Trophy size={20} className="text-yellow-500" />
              </div>
              <div className="truncate">
                <p className="text-sm text-gray-700">{achievement.badge}</p>
                <p className="text-xs text-gray-400">
                  {new Date(achievement.createdAt).toLocaleDateString()}
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
          {user.foodDonations?.map((donation) => (
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
          {user.referrals?.map((referral) => (
            <div key={referral.id} className="p-4 border-b border-gray-200">
              <p className="text-sm text-gray-700">
                Referred User: {referral.joineeId}
              </p>
              <p className="text-xs text-gray-400">
                Referral Code: {referral.referralCode}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
