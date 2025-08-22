import React from "react";

const LeaderBoardComp = ({ leaderBoard }) => {
  // function to show medal for top 3
  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank; // for others, just show rank number
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
        🏆 Leaderboard
      </h2>

      <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map((entry, index) => (
              <tr
                key={entry.userName}
                className={`${
                  index === 0
                    ? "bg-green-800/50 text-green-500 font-semibold"
                    : "hover:bg-gray-800"
                } transition-colors`}
              >
                <td className="py-3 px-4">{getMedal(entry.rank)}</td>
                <td className="py-3 px-4">{entry.userName}</td>
                <td className="py-3 px-4">{entry.rewardCount} ⭐</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoardComp;
