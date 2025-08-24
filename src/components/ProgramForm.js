import React, { useState } from "react";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Loader from "../components/Loader";

export default function ProgramForm({formData,setFormData}) {

  const {postPrograms,getMyPrograms,loading} = useAppContext();

 const [file, setFile] = useState(null);
 const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      // always make sure it's stored as array
      const tagsArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      setFormData({
        ...formData,
        tags: tagsArray,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!file) return;
      const storageRef = ref(storage, `programs/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      navigate("/myprograms")
      await postPrograms({...formData,
        image:url
      });
      setFormData({
        title: "",
        companyName: "",
        description: "",
        scope: "",
        rewardRange: "",
        maxReward: "",
        status: "ACTIVE",
        programType: "Public",
        tags: "",
        createdBy: "",
        contactEmail: "",
        policyUrl: "",
        disclosurePolicy: "",
        image: "",
        expiryDate: "",
      })
      getMyPrograms();
  };

  if(loading){
    return(
      <Loader/>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-2 pt-16">
  <div className="w-full max-w-3xl bg-gray-800/60 rounded-2xl shadow-lg border border-gray-700 p-4 md:p-8">
    <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-emerald-400 text-center">
      Create New Bug Bounty Program
    </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-300 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

         

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Scope */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Scope</label>
            <textarea
              name="scope"
              value={formData.scope}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Reward Range */}
          <div>
            <label className="block text-gray-300 mb-1">Reward Range</label>
            <input
              type="text"
              name="rewardRange"
              value={formData.rewardRange}
              onChange={handleChange}
              placeholder="$100 - $5000"
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Max Reward */}
          <div>
            <label className="block text-gray-300 mb-1">Max Reward</label>
            <input
              type="number"
              name="maxReward"
              value={formData.maxReward}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-300 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="ACTIVE">Active</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Program Type */}
          <div>
            <label className="block text-gray-300 mb-1">Program Type</label>
            <select
              name="programType"
              value={formData.programType}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Web, Mobile, API"
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Contact Email */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Policy URL */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Policy URL</label>
            <input
              type="url"
              name="policyUrl"
              value={formData.policyUrl}
              onChange={handleChange}
              placeholder="https://company.com/security-policy"
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Disclosure Policy */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Disclosure Policy</label>
            <input
              type="text"
              name="disclosurePolicy"
              value={formData.disclosurePolicy}
              onChange={handleChange}
              placeholder="Full Disclosure / Coordinated"
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1 text-sm md:text-base lg:text-lg">
              Upload Program Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 md:p-3 lg:p-4 rounded-lg bg-gray-800/50 border border-gray-700 
                         file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-xs md:file:text-sm lg:file:text-base 
                         file:font-semibold 
                         file:bg-emerald-500 file:text-white 
                         hover:file:bg-emerald-600 cursor-pointer"
            />
          </div>

          {/* Expiry Date */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Create Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
