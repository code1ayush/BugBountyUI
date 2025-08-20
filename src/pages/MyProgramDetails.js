import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { ArrowLeft } from "lucide-react";
import { getStorage, ref, deleteObject } from "firebase/storage";

const MyProgramDetails = () => {

  const {deleteProgram,myPrograms , getMyPrograms } = useAppContext();

  const user = localStorage.getItem("user")
  const navigate = useNavigate();
  const { id } = useParams();


  const [program, setProgram] = useState(null);
  const [showModal,setShowModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null);

  const handleShowModel = () =>{
    setShowModal(true);
  }

  const handleDelete = async () => {
    try {
      await deleteProgram(id);
      await  getMyPrograms()
      setShowModal(false);
      navigate("/myprograms");
      const storage = getStorage();
      const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
      const withoutBase = program.image.replace(baseUrl, "");
      const pathStartIndex = withoutBase.indexOf("/o/") + 3;
      const pathEndIndex = withoutBase.indexOf("?");
      const fullPath = decodeURIComponent(withoutBase.substring(pathStartIndex, pathEndIndex));
      const imageRef = ref(storage,fullPath ); // imagePath is the path where you stored the image in Firebase
      await deleteObject(imageRef);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    if (myPrograms.length === 0) {
      getMyPrograms();
    } else {
      const found = myPrograms.find((p) => String(p.id) === id);
      setProgram(found);
    }
  }, [myPrograms, id, getMyPrograms,user]);



  if (!program)
    return (
      <div className="p-6 text-gray-400 text-center animate-pulse">
        Loading program details...
      </div>
    );



  const handleBack = () => {
      navigate("/myprograms");
  };




  return (
    <>
    <div className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-gray-700">
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    {/* Modal box */}
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p className="text-gray-300 mb-6">
        Are you sure you want to delete this program? This action cannot be undone.
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

      {/* Back Button */}
      <div className="flex justify-between items-center mb-6">
  {/* Back Link */}
  <button onClick={handleBack} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
    <ArrowLeft size={18} /> Back to Programs
  </button>

  {/* Delete Button (only for my programs) */}

    <button
      onClick={handleShowModel}
      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition border-white"
    >
      🗑 Delete
    </button>

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

      <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-inner">
        <h3 className="text-2xl font-semibold text-red-400 mb-3">
          Program Description
        </h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {program.description}
        </p>
      </div>
    </div>
    

<div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">
        Submitted Reports
      </h2>

      {program.submittedReport && program.submittedReport.length > 0 ? (
        <div className="space-y-4">
          {program.submittedReport.map((report, index) => (
            <div
              key={index}
              onClick={() => setSelectedReport(report)}
              className="p-4 border border-gray-700 rounded-xl bg-gray-800 shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-red-400">
                {report.title || `Report #${index + 1}`}
              </h3>
              <p className="text-gray-300 mt-2 line-clamp-2">
                {report.description || "No description provided."}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 p-6 border border-gray-700 rounded-xl">
          No reports have been submitted yet.
        </div>
      )}

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg border border-gray-700 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedReport(null)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-red-400 mb-4">
              {selectedReport.title}
            </h2>
            <p className="text-gray-300 mb-4">{selectedReport.description}</p>

            <div className="text-sm text-gray-400 space-y-2">
              <p>
                <span className="font-medium text-blue-400">Reported By:</span>{" "}
                {selectedReport.reportedBy}
              </p>
              <p>
                <span className="font-medium text-green-400">Date:</span>{" "}
                {selectedReport.createdAt
                  ? new Date(selectedReport.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <span className="font-medium text-yellow-400">Status:</span>{" "}
                {selectedReport.status || "Pending"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>

    </>
  );
};

export default MyProgramDetails;
