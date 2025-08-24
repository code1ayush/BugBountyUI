import React from "react";
import { useParams} from "react-router-dom";
import { useAppContext } from "../context/appContext";
import {useState,useEffect} from 'react'
import ProgramDetail from "../components/ProgramDetail";
import Loader from "../components/Loader";

const ProgramDetails = () => {
    const { id } = useParams();
    const {getProgramById } = useAppContext();
    const [program, setProgram] = useState(null);

  useEffect(() => {
    const loadProgram = async () => {
      const fullProgram = await getProgramById(id);
      setProgram(fullProgram);
    };
    loadProgram();
  }, [id, getProgramById]);

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!program) {
    return (
      <Loader/>
    );
  }
  return (
    <>
      <ProgramDetail program={program} id={id}/>
    </>
  );
};

export default ProgramDetails;
