import React from 'react';
import LeaderboardCard from './LeaderboardCard';

const leaderboardData = [
  { rank: 1, name: 'John Doe', score: 1500 },
  { rank: 2, name: 'Jane Smith', score: 1400 },
  { rank: 3, name: 'Sam Johnson', score: 1300 },
  { rank: 4, name: 'Emily Davis', score: 1200 },
  { rank: 5, name: 'Michael Brown', score: 1100 },
  { rank: 6, name: 'David Lee', score: 1000 },
  { rank: 7, name: 'Sophia Wilson', score: 900 },
];

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#faff1f] mb-6">
        Leaderboard
      </h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {leaderboardData.map((entry) => (
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
