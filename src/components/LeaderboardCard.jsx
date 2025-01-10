import { Crown, Medal, Trophy, User } from 'lucide-react';

const LeaderboardCard = ({ rank, name, score }) => {
  let rankIcon;
  let rankClass = "text-gray-500";

  // Customize for top 3 ranks
  if (rank === 1) {
    rankIcon = <Crown className="text-yellow-500" />;
    rankClass = "bg-yellow-200 text-yellow-600";
  } else if (rank === 2) {
    rankIcon = <Medal className="text-gray-500" />;
    rankClass = "bg-gray-300 text-gray-600"; 
  } else if (rank === 3) {
    rankIcon = <Trophy className="text-orange-500" />;
    rankClass = "bg-orange-100 text-orange-600"; 
  } else {
    rankIcon = <User className="text-gray-500" />;
  }

  return (
    <div className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 ${rankClass}`}>
      <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-xl text-gray-700">
        {rankIcon}
      </div>
      <div className="ml-4 flex-1">
        <div className="text-lg font-semibold text-gray-800">{name}</div>
        <div className="text-sm text-gray-500">Points: {score}</div>
      </div>
      <div className="text-lg font-semibold text-gray-700">{rank}</div>
    </div>
  );
};

export default LeaderboardCard;
