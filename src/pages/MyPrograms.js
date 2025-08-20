import React from 'react'
import { useAppContext } from '../context/appContext';
import { useEffect,useState } from 'react';
import ProgrampageComponent from '../components/ProgrampageComponent';
import { Send,FilePlus } from "lucide-react";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MyPrograms = () => {
    const {myPrograms, getMyPrograms,postPrograms} = useAppContext();
    const [file, setFile] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData ,setFormData] = useState({
      title:"",
      image:"",
      description:"",
      scope:"",
      rewardRange:""
    });

    useEffect(() => {
                if (myPrograms.length === 0) {
                  getMyPrograms();
                }
              }, []);
              console.log(myPrograms);

    const handleChange =(e) =>{
      setFormData({...formData, [e.target.name]: e.target.value});
    }


    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) return;

    // Upload image to Firebase
    const storageRef = ref(storage, `programs/${file.name}`);
    await uploadBytes(storageRef, file);

    // Get download URL
    const url = await getDownloadURL(storageRef);
      await postPrograms({...formData,
        image:url
      });
      setFormData({
      title:"",
      image:"",
      description:"",
      scope:"",
      rewardRange:""
      })
      getMyPrograms();
      setShowForm(false);
    }

      
  return (
    <>
    <ProgrampageComponent myPrograms={myPrograms} getMyPrograms={getMyPrograms}/>
    <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center mx-auto m-5 gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl transition shadow-md hover:shadow-red-500/30"
          >
            <FilePlus size={18} /> Create Program
          </button>
    {showForm?<form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg animate-fadeIn"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
              Create a program
          </h3>

          {/* Input fields */}
          <div className="grid gap-4 md:grid-cols-2">
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

 <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Scope</label>
              <textarea
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-red-500">
              </textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rewared Range</label>
              <textarea
                name="rewardRange"
                value={formData.rewardRange}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-red-500">
              </textarea>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition shadow-md hover:shadow-green-500/30 mx-auto"
          >
            <Send size={18} /> Create Program
          </button>
        </form>:""}

    </>
  )
}

export default MyPrograms
