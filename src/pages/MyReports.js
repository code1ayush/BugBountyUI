import React, { useEffect,useState } from 'react'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const MyReports = () => {
    const navigate = useNavigate();
    const {myReports,getMyReports,getProgramById} = useAppContext();
    const [selectedReport, setSelectedReport] = useState(null);


    useEffect(()=>{
        if(myReports.length===0){
            getMyReports();
        }
    },[myReports,getMyReports])
    
    const handleprogram = async()=>{
        await getProgramById(selectedReport.programId);
        navigate(`/programs/${selectedReport.programId}`)
    }

  return (
    
<div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">
        Submitted Reports
      </h2>

      {myReports && myReports.length > 0 ? (
        <div className="space-y-4">
          {myReports.map((report, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedReport(report);
  }}
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
            {/* Close button */}
            <button
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
        onClick={() => {
          setSelectedReport(null);
        }}
      >
        ✕
      </button>

            <button onClick={handleprogram}>
  <span className="font-medium text-white">Program</span>
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
  )
}

export default MyReports
