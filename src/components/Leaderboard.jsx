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
  { rank: 8, name: 'Olivia Martinez', score: 800 },
  { rank: 9, name: 'Liam Anderson', score: 700 },
  { rank: 10, name: 'Isabella Thomas', score: 600 },
  { rank: 11, name: 'Mason Jackson', score: 500 },
  { rank: 12, name: 'Ava White', score: 400 },
  { rank: 13, name: 'Lucas Harris', score: 300 },
  { rank: 14, name: 'Mia Clark', score: 200 },
  { rank: 15, name: 'Ethan Lewis', score: 100 },
  { rank: 16, name: 'Amelia Robinson', score: 50 },
  { rank: 17, name: 'James Walker', score: 25 }
];

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#faff1f] mb-6 ">
        Leaderboard
      </h1>
      <div className="bg-white rounded-lg shadow-md overflow-y-scroll max-h-[75vh]">
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
