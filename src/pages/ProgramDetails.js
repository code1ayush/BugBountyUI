import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { ArrowLeft, FilePlus, Send } from "lucide-react";
import axios from "axios";

const ProgramDetails = () => {
  const navigate = useNavigate();
const localStorageToken = localStorage.getItem("token");
  const user = localStorage.getItem("user")
  const { id } = useParams();
  const { allPrograms,myPrograms,getProgramById} = useAppContext();
  const [program, setProgram] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    programId: id,
    reportedBy: user,
    title: "",
    description: "",
    severity: "",
    status: "",
    createdAt: new Date().toISOString(),
  });

  const isMyProgram = myPrograms.some((program) => program.id === id);


useEffect(() => {
  const loadProgram = async () => {
    let found = null;

    // If we already have all programs, try to find it
    if (allPrograms.length > 0) {
      found = allPrograms.find((p) => String(p.id) === String(id));
    }

    // If not found, fetch directly by ID
    if (!found) {
      const fetched = await getProgramById(id);
      found = fetched;
    }

    setProgram(found);
  };

  loadProgram();
}, [id, allPrograms, getProgramById]);

  if (!program)
    return (
      <div className="p-6 text-gray-400 text-center animate-pulse">
        Loading program details...
      </div>
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:8080/reports", {
      ...formData,
      programId: id, // ensure programId is linked
      reportedBy: user,
      createdAt: new Date().toISOString(),
    },{
        headers: {
        Authorization: `Bearer ${localStorageToken}`, 
      }
    });

    alert("Report submitted successfully!");

    setFormData({
      programId: id,
      reportedBy: user, // assuming you get this from context/auth
      title: "",
      description: "",
      severity: "",
      status: "",
      createdAt: "",
    });

    setShowForm(false);
  } catch (err) {
    console.error("Error submitting report:", err);
    alert("Failed to submit report.");
  }
};

  const handleBack = () => {
      navigate("/programs");
  };




  return (
    <div className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-gray-700">
      
      {/* Back Button */}
      <div className="flex justify-between items-center mb-6">
  {/* Back Link */}
  <button onClick={handleBack} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
    <ArrowLeft size={18} /> Back to Programs
  </button>

  {/* Delete Button (only for my programs) */}
</div>

      {program.image && (
  <div className="mb-6">
    <img
      src={program.image}
      alt={program.title}
      className="w-full h-64 object-cover rounded-xl border border-gray-700 shadow-md"
    />
  </div>
)}

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
        {program.title}
      </h2>

      {/* Details Section */}
      <div className="grid gap-4 md:grid-cols-2 text-gray-300 mb-6">
        <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:shadow-md transition">
          <span className="block text-sm text-gray-400">Scope</span>
          <p className="text-lg font-semibold text-red-400">{program.scope}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:shadow-md transition">
          <span className="block text-sm text-gray-400">Reward Range</span>
          <p className="text-lg font-semibold text-green-400">
            {program.rewardRange}
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:shadow-md transition">
          <span className="block text-sm text-gray-400">Created By</span>
          <p className="text-lg font-semibold">{program.createdBy}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:shadow-md transition flex flex-col justify-between">
          <span className="block text-sm text-gray-400">Created At</span>
          <p className="text-lg font-semibold mb-3">
            {new Date(program.createdAt).toLocaleString()}
          </p>
          
        </div>
      </div>

      {/* Description at Bottom */}
      <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-inner">
        <h3 className="text-2xl font-semibold text-red-400 mb-3">
          Program Description
        </h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {program.description}
        </p>
        {!isMyProgram && <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center mx-auto m-5 gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl transition shadow-md hover:shadow-red-500/30"
          >
            <FilePlus size={18} /> Create Report
          </button>}
      </div>

      {/* Report Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg animate-fadeIn"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Submit a New Report
          </h3>

          {/* Input fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Program ID</label>
              <input
                type="text"
                name="programId"
                value={formData.programId}
                readOnly
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Reported By</label>
              <input
                type="text"
                name="reportedBy"
                value={formData.reportedBy}
                readOnly
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-red-500"
              />
            </div>
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
              <label className="block text-sm text-gray-400 mb-1">Severity</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Severity</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Status</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition shadow-md hover:shadow-green-500/30 mx-auto"
          >
            <Send size={18} /> Submit Report
          </button>
        </form>
      )}
    </div>
  );
};

export default ProgramDetails;
