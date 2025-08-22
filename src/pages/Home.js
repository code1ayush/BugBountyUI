// src/pages/Home.js
import React from 'react';
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const {getAllPrograms, getMyPrograms,getMyReports,getReward,getLeaderBoard} = useAppContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    await getAllPrograms(); // fetch first
    navigate("/programs"); // then go to /programs
  };

  const handleGetMyProgram = async () =>{
    await getMyPrograms();
    navigate("/myprograms")
  }

  const handleGetMyReport = async ()=>{
    await getMyReports();
    navigate("/myreports")
  }

  const handleRewards = async()=>{
    await getReward();
    navigate("/rewards")
  }

  const handleLeaderBoard = async()=>{
    await getLeaderBoard();
    navigate("/leaderboard")
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          Your Expertise, <br className="hidden md:inline"/> Your Reward.
        </h1>
        <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-300 md:text-xl">
          Join a global community of security experts. Find critical vulnerabilities,
          submit your findings, and get paid by leading companies.
        </p>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col items-center justify-center gap-4 mb-16 sm:flex-row">
        <button
          onClick={handleLeaderBoard}
          className="w-full px-8 py-4 text-lg text-center font-bold text-white transition-transform transform bg-red-500 rounded-full shadow-lg sm:w-auto hover:bg-red-600 hover:scale-105"
        >
          Check leaderboard
        </button>
        <button onClick={handleClick}
          className="w-full px-8 py-4 text-lg font-bold text-gray-200 transition-colors border-2 border-gray-600 rounded-full sm:w-auto hover:border-red-500 hover:text-red-500"
        >
          Explore Programs
        </button>

      </div>

      {/* Features Section */}
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Feature Card 1 */}
        <button onClick={handleGetMyProgram}>
        <div className="p-8 transition-colors duration-300 border border-gray-700 shadow-lg bg-gray-900 rounded-3xl hover:border-red-500">
          <h3 className="flex items-center mb-3 text-xl font-bold text-red-500">
            <span className="mr-2 text-3xl">🔍</span> Your Programs
          </h3>
          <p className="text-gray-300 text-left">
            Manage and monitor the programs you’ve launched.
            Keep track of reports, activity, and updates—all in one place.</p>
        </div>
        
        </button >
        {/* Feature Card 2 */}
        <button onClick={handleGetMyReport}>
        <div className="p-8 transition-colors duration-300 border border-gray-700 shadow-lg bg-gray-900 rounded-3xl hover:border-purple-500">
          <h3 className="flex items-center mb-3 text-xl font-bold text-purple-500">
            <span className="mr-2 text-3xl">📝</span> Track Your Reports
          </h3>
          <p className="text-gray-300">
            Use our streamlined platform to submit your findings confidentially.
            Track your report's status in real-time.
          </p>
        </div>
        </button>
        {/* Feature Card 3 */}
        
          <button onClick={handleRewards}>
            <div className="p-8 transition-colors duration-300 border border-gray-700 shadow-lg bg-gray-900 rounded-3xl hover:border-green-500">
          <h3 className="flex items-center mb-3 text-xl font-bold text-green-500">
            <span className="mr-2 text-3xl">💰</span> Earn Rewards
          </h3>
          <p className="text-gray-300">
            Get paid competitive bounties for your validated discoveries.
            Your expertise is valuable and we ensure prompt payouts.
          </p>
        </div>
          </button>
        
      </div>

    </div>
  );
}
