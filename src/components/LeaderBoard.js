import React from "react";

const LeaderBoard = ({ leaderBoard }) => {
  // function to show medal for top 3
  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank; // for others, just show rank number
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-100 mb-8 tracking-wide">
        🏆 Leaderboard
      </h2>

      <div className="overflow-hidden rounded-2xl shadow-md border border-gray-800 bg-gradient-to-b from-gray-900 to-black">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 text-sm uppercase tracking-wide">
              <th className="py-4 px-6 text-left">Rank</th>
              <th className="py-4 px-6 text-left text-center">Researcher</th>
              <th className="py-4 px-6 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map((entry, index) => (
              <tr
                key={entry.userName}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-gray-900/60" : "bg-gray-900/30"
                } hover:bg-gray-800/60`}
              >
                <td className="py-4 px-6 text-gray-300 font-medium">
                  {getMedal(entry.rank)}
                </td>
                <td className="py-4 px-6 text-gray-200 font-medium text-center">
                  {entry.userName}
                </td>
                <td className="py-4 px-6 text-right font-semibold text-yellow-400">
                  {entry.rewardCount} ⭐
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        Rankings are updated based on latest reports.
      </p>
    </div>
  );
};

export default LeaderBoard;
