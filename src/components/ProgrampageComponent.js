import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

const ProgrampageComponent = ({ myPrograms, getMyPrograms }) => {
  useEffect(() => {
    if (myPrograms.length === 0) {
      getMyPrograms();
    }
  }, [myPrograms,getMyPrograms]);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent">
        Your Bug Bounty Programs
      </h2>

      {myPrograms.length === 0 ? (
        <div className="flex justify-center items-center">
    <div className="text-center text-gray-400 text-lg p-28 border border-gray-700 rounded-2xl bg-gray-900/60 shadow-md w-full max-w-md m-20 ">
      <h1 className="font-semibold text-white mb-2">No Programs Found</h1>
      <p className="text-sm text-gray-400">You don’t have any programs yet.</p>
    </div>
  </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPrograms.map((program) => (
            <Link
              to={`/myprograms/${program.id}`}
              key={program.id}
              className="group bg-gray-900/80 border border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-red-500 transition transform hover:-translate-y-2"
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition">
                {program.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {program.description}
              </p>

              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-green-400" /> {program.createdBy}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-400" />{" "}
                  {new Date(program.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgrampageComponent;
