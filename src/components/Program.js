import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import React, { useEffect } from "react";
import Loader from "./Loader";


const Program = ({ allPrograms, getAllPrograms,loading }) => {
  
    
  useEffect(()=>{
    if(allPrograms===null){
      getAllPrograms();
    }
  },[allPrograms,getAllPrograms]);

  if(loading){
    return(
      <Loader/>
    )
  }

  return (
    <>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {allPrograms? allPrograms.map((program) => (
          <Link
            to={`/programs/${program.id}`}
            key={program.id}
            className="group bg-gray-900/80 border border-gray-800 rounded-lg p-3 m-2 shadow-md hover:shadow-xl hover:border-red-500 transition transform hover:-translate-y-2"
          >
            <img 
                src={program.image} 
                alt={program.title} 
                className="w-full h-48 object-cover rounded-md"
              />
            <h3 className="text-xl font-bold mb-2 mt-4 pl-1 group-hover:text-red-400 transition">
              {program.title.charAt(0).toUpperCase() + program.title.slice(1)}
            </h3>
            
            <p className="text-gray-400 text-sm mb-2 pl-1 line-clamp-2 ">
              <span className="font-bold text-purple-300">Description:</span> {program.description}
            </p>
            
            <div className="space-y-2 text-gray-300 text-sm pl-1">
              <div className="flex items-center gap-2 ">
                <span className="font-bold text-purple-300">CreatedBy:</span>
                 {program.createdBy}
              </div>
              <div className="flex items-center gap-2 ">
                <span className="font-bold text-purple-300">Rewards:</span>
                 <span className="text-green-400">{program.rewardRange}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-blue-400 " />{" "}
                {new Date(program.createdAt).toLocaleDateString()}
              </div>
            </div>
          </Link>
        )):(
          <div className="flex flex-col items-center justify-center w-full h-96 col-span-full text-gray-400">
            <span className="text-5xl animate-bounce">📂</span>
            <p className="mt-4 text-lg">No programs yet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Program;
