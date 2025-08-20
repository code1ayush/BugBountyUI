import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({children}) => {

  const[allPrograms,setAllPrograms] = useState([]);
  const[myPrograms,setMyprograms] = useState([]);
  const[myReports,setMyReports] = useState([])

  const localStorageToken = localStorage.getItem("token");


    const addTokenToLocalStorage = (token) => {
      localStorage.setItem("token", token);
    };

    const removeTokenFromLocalStorage = () => {
      localStorage.removeItem("token");
    };

    const logoutUser = () =>{
    removeTokenFromLocalStorage("token");
    removeTokenFromLocalStorage("user");
    window.location.href = "/landing";
  }

  const registerUser = async (currentUser) =>{
    try{
      const response = await axios.post("http://localhost:8080/public/signup",currentUser);
      addTokenToLocalStorage(response.data);
      localStorage.setItem("user", currentUser.userName);
      window.location.href = "/";
    }catch (error) {
      console.log("can not register the user");
    }
  }

  const loginUser = async(currentUser) => {
    try{
      const response = await axios.post("http://localhost:8080/public/login",currentUser);
      addTokenToLocalStorage(response.data);
      console.log("this is current user" + currentUser);
      localStorage.setItem("user", currentUser.userName);
      window.location.href = "/";
    }catch (error) {
      console.log("can not register the user");
    }
  }

  const getAllPrograms = async()=>{
    try{
    const response = await axios.get("http://localhost:8080/programs/allPrograms", {
      headers: {
        Authorization: `Bearer ${localStorageToken}`, 
      },
    });
    setAllPrograms(response.data); 
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }

}

const postPrograms = async(programToPost) =>{
  try{
     await axios.post("http://localhost:8080/programs",programToPost,{
    headers:{
      Authorization : `Bearer ${localStorageToken}`, 
    }
  })
  }catch(Error){
    throw Error;
  }
}

const getMyPrograms = async() =>{
  try{
    const response = await axios.get("http://localhost:8080/programs",{
      headers:{
        Authorization: `Bearer ${localStorageToken}`,
      }
    })
    setMyprograms(response.data);
    
  }catch(e){
    throw e;
  }
}

const deleteProgram = async(id)=>{
  try{
     await axios.delete(`http://localhost:8080/programs/id/${id}`,{
      headers:{
        Authorization: `Bearer ${localStorageToken}`,
      }
    })
  }catch(error){
    throw error;
  }
}

const getMyReports = async()=>{
  try{
    const response = await axios.get("http://localhost:8080/reports/myreports",{
      headers:{
        Authorization: `Bearer ${localStorageToken}`,
      }
    })
    setMyReports(response.data);
  }catch(error){
    throw error;
  }
}

const getProgramById = async(id)=>{
  try{
    const response = await axios.get(`http://localhost:8080/programs/id/${id}`,{
      headers:{
        Authorization: `Bearer ${localStorageToken}`,
      }
    })
    return response.data;
  }catch(error){
    throw error;
  }
}


  return(
    <AppContext.Provider
    value={{
      registerUser,
      loginUser,
      logoutUser,
      getAllPrograms,
      allPrograms,
      postPrograms,
      getMyPrograms,
      myPrograms,
      deleteProgram,
      myReports,
      getMyReports,
      getProgramById
    }}
    >{children}</AppContext.Provider>
  )

}

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };