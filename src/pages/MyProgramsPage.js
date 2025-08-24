import React from "react";
import Program from "../components/Program";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { FilePlus } from "lucide-react";
const MyProgramPage = () => {

  const { getMyPrograms,myPrograms,loading } = useAppContext();
  const navigate = useNavigate();

  const handleForm = () =>{
    navigate("/programform")
  }

  return (
    <>
    <div className="w-full px-0 sm:px-4 md:max-w-6xl md:mx-auto mt-20">
      <h2 className="mx-4 text-3xl font-extrabold mb-6  text-center bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent ">
        Your Bounty Programs
      </h2>
       <Program allPrograms={myPrograms}  getAllPrograms={getMyPrograms} loading={loading}/>
       <button
      onClick={handleForm}
      className="flex items-center mx-auto m-5 gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl transition shadow-md hover:shadow-red-500/30">
      <FilePlus size={18} /> Create Program
    </button>
    </div>
    
    </>

  );
};

export default MyProgramPage;