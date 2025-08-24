import React from "react";
import Program from "../components/Program";
import { useAppContext } from "../context/appContext"
const ProgramPage = () => {

  const { allPrograms, getAllPrograms,loading } = useAppContext();

  return (
    <div className="w-full px-0 sm:px-4 md:max-w-6xl md:mx-auto mt-20">
      <h2 className="mx-4 text-3xl font-extrabold mb-6  text-center bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent ">
        Active Bug Bounty Programs
      </h2>
       <Program allPrograms={allPrograms} getAllPrograms={getAllPrograms} loading={loading}/>
    </div>
  );
};

export default ProgramPage;

