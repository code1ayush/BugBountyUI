import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import {Calendar, User } from "lucide-react";

const Program = () => {
  const { allPrograms, getAllPrograms } = useAppContext();

  useEffect(() => {
    if (allPrograms.length === 0) {
      getAllPrograms();
    }
  }, [allPrograms,getAllPrograms]);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent">
        Active Bug Bounty Programs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {allPrograms.map((program) => (
          <Link
            to={`/programs/${program.id}`}
            key={program.id}
            className="group bg-gray-900/80 border border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-red-500 transition transform hover:-translate-y-2"
          >
            <img 
                src={program.image} 
                alt={program.title} 
                className="w-full h-48 object-cover rounded-xl"
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
    </div>
  );
};

export default Program;

