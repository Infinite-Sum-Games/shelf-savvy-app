import React, { useState } from 'react';
import LeaderboardCard from './LeaderboardCard';

const leaderboardData = {
  monthly: [
    { rank: 1, name: 'John Doe', score: 1500 },
    { rank: 2, name: 'Jane Smith', score: 1400 },
    { rank: 3, name: 'Sam Johnson', score: 1300 },
    { rank: 4, name: 'Emily Davis', score: 1200 },
    { rank: 5, name: 'Michael Brown', score: 1100 },
  ],
  weekly: [
    { rank: 1, name: 'David Lee', score: 1000 },
    { rank: 2, name: 'Sophia Wilson', score: 900 },
    { rank: 3, name: 'Olivia Martinez', score: 800 },
    { rank: 4, name: 'Liam Anderson', score: 700 },
    { rank: 5, name: 'Isabella Thomas', score: 600 },
  ],
  yearly: [
    { rank: 1, name: 'Mason Jackson', score: 5000 },
    { rank: 2, name: 'Ava White', score: 4000 },
    { rank: 3, name: 'Lucas Harris', score: 3000 },
    { rank: 4, name: 'Mia Clark', score: 2000 },
    { rank: 5, name: 'Ethan Lewis', score: 1000 },
  ],
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('monthly'); // State to handle the active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getLeaderboardData = () => {
    return leaderboardData[activeTab];
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#faff1f] mb-6 ">
        Leaderboard
      </h1>

      {/* Tab Bar */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => handleTabChange('monthly')}
          className={`px-4 py-2 mx-2 rounded-lg text-lg font-semibold ${activeTab === 'monthly' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => handleTabChange('weekly')}
          className={`px-4 py-2 mx-2 rounded-lg text-lg font-semibold ${activeTab === 'weekly' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Weekly
        </button>
        <button
          onClick={() => handleTabChange('yearly')}
          className={`px-4 py-2 mx-2 rounded-lg text-lg font-semibold ${activeTab === 'yearly' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Yearly
        </button>
      </div>

      {/* Leaderboard Content */}
      <div className="bg-white rounded-lg shadow-md overflow-y-scroll max-h-[75vh]">
        {getLeaderboardData().map((entry) => (
          <LeaderboardCard
            key={entry.rank}
            rank={entry.rank}
            name={entry.name}
            score={entry.score}
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
