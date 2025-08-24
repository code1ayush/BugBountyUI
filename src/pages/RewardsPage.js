import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { ShieldCheck, Coins } from "lucide-react";

const Rewards = () => {
  const { getReward, reward } = useAppContext();

  useEffect(() => {
    if (reward.length === 0) {
      getReward();
    }
  }, [getReward, reward]);

  return (
    <div className="px-4 md:px-12 lg:px-20 mt-16">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-10 text-center">
        🎖 My Rewards
      </h1>

      {reward && reward.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reward.map(({ id, programId, title, points, status }) => (
            <div
              key={id}
              className="p-6 rounded-xl border border-gray-800 bg-gray-950/70 
                         shadow-sm hover:shadow-lg hover:shadow-emerald-500/10
                         hover:border-emerald-500/40 transition-all duration-300"
            >
              {/* Header with program */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-200">{title}</h2>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Program ID */}
              <p className="text-sm text-gray-400 mb-2">
                <span className="text-gray-300">Program ID:</span>{" "}
                <span className="text-blue-400 font-medium">{programId}</span>
              </p>

              {/* Status */}
              <p className="text-sm text-gray-400 mb-2">
                <span className="text-gray-300">Status:</span>{" "}
                <span
                  className={`${
                    status === "ACCEPTED"
                      ? "text-emerald-400"
                      : status === "REJECTED"
                      ? "text-red-400"
                      : "text-yellow-400"
                  } font-medium`}
                >
                  {status}
                </span>
              </p>

              {/* Points */}
              <div className="flex items-center gap-2 mt-4">
                <Coins className="w-5 h-5 text-green-400" />
                <p className="text-base text-green-400 font-semibold">
                  {points} $
                </p>
              </div>

              {/* Bonus message */}
              {status === "ACCEPTED" && (
                <div className="mt-6 text-center text-sm text-emerald-300 bg-emerald-900/20 border border-emerald-600/30 rounded-lg py-2 px-3">
                  🎉 You have been awarded with a bounty of{" "}
                  <span className="font-semibold">{points}$</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-base font-medium bg-gray-900/60 
                        border border-gray-800 rounded-lg px-6 py-4 
                        inline-block shadow-inner">
            🚫 No rewards found
          </p>
        </div>
      )}
    </div>
  );
};

export default Rewards;
