import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'

const Rewards = () => {

  const {getReward,reward} = useAppContext();

  useEffect(()=>{
    if(reward.length===0){
      getReward();
    }
  },[getReward,reward])
  return (
    <>
    {reward && reward.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {reward.map(({ id, programId, title, points }) => (
      <div
        key={id}
        className="p-6 rounded-2xl shadow-lg border border-gray-700 bg-gray-900 hover:border-red-500 hover:shadow-red-500/40 transition-all duration-300"
      >
        <h2 className="text-xl font-bold text-red-500 mb-3">{title}</h2>
        <p className="text-gray-300">
          <span className="font-semibold text-yellow-400">Program ID:</span>{" "}
          {programId}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold text-green-400">Points:</span>{" "}
          <span className="text-green-400 font-bold">{points}$</span>
        </p>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-10">
    <p className="text-red-500 text-lg font-bold bg-gray-800 border border-red-500 rounded-xl px-6 py-4 inline-block shadow-md">
      🚫 No rewards found
    </p>
  </div>
)}

    </>
  )
}

export default Rewards
