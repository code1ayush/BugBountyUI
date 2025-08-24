import React from 'react'
import { useLocation } from 'react-router-dom';
import { Bug, Clock, User, ShieldAlert, FileText, CheckCircle2, Link2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SubmittedReportPage = () => {

  const { state } = useLocation();
  const myReports = state?.reports;
  const navigate = useNavigate();


  if (!myReports) return <p>Report not found. Please go back.</p>;
  console.log(myReports);

    const handlereport = (report) =>{
    navigate(`/submittedReports/${report.id}`,{ state: { report } })
    }

  return (
   <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-200 mt-16">
        Submitted Reports
      </h2>

      {myReports && myReports.length > 0 ? (
        <div className="space-y-4">
          {myReports.map((report, index) => (
            <div
              key={index}
              onClick={()=>handlereport(report)}
              className="p-6 cursor-pointer ">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto text-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-700 pb-3 mb-4">
        <Bug className="text-red-400" size={28} />
        <h2 className="text-xl font-semibold">{report.title}</h2>
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="text-blue-400" size={18} />
          <p className="text-sm">
            <span className="font-semibold">Reported By:</span> {report.reportedBy}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ShieldAlert className="text-yellow-400" size={18} />
          <p className="text-sm">
            <span className="font-semibold">Severity:</span>{" "}
            <span className="px-2 py-0.5 rounded-lg bg-gray-800 text-yellow-300">
              {report.severity}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2
            className={report.status === "RESOLVED" ? "text-green-400" : "text-orange-400"}
            size={18}
          />
          <p className="text-sm">
            <span className="font-semibold">Status:</span> {report.status}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="text-purple-400" size={18} />
          <p className="text-sm">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>

        {report.affectedEndpoint && (
          <div className="flex items-center gap-2">
            <Link2 className="text-teal-400" size={18} />
            <p className="text-sm">
              <span className="font-semibold">Affected Endpoint:</span> {report.affectedEndpoint}
            </p>
          </div>
        )}

        <div className="flex items-start gap-2">
          <FileText className="text-gray-400 mt-1" size={18} />
          <p className="text-sm leading-relaxed line-clamp-2">
            <span className="font-semibold">Description:</span> {report.description}
          </p>
        </div>
      </div>
    </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 p-6 border border-gray-700 rounded-xl">
          No reports have been submitted yet.
        </div>
      )}
    </div>
  )
}

export default SubmittedReportPage
