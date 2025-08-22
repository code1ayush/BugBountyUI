// src/pages/Layout.js
import { Outlet, Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Layout() {
  const { logoutUser,getTotalPoints,totalPoints } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = localStorage.getItem("user"); 

  useEffect(()=>{
    if(totalPoints===-1){
      getTotalPoints();
    }
  },[getTotalPoints,totalPoints])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 bg-gray-900 shadow-md relative">
        <h1 className="text-xl font-bold text-red-500">Bug Bounty App</h1>
        
        <nav className="flex items-center space-x-6 font-semibold">
          <Link to="/" className="hover:text-red-500 transition-colors">
            Home
          </Link>

          <p className="text-green-500">{totalPoints}$</p>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-red-600"
            >
              {user || "User"} <ChevronDown size={16} className={`transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <div 
              className={`absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out origin-top ${dropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
            >
              <button
                onClick={logoutUser}
                className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}