import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { ExternalLink, User, Calendar } from "lucide-react";
import { useAppContext } from '../context/appContext';

const SubmittedReportsDetailPage = () => {
  const { updateReportById, postReward } = useAppContext();
  const { id } = useParams();
  const { state } = useLocation();
  const [report, setReport] = useState(state?.report);
  const [rewardData, setRewardData] = useState({
    programId: id,
    title: "",
    points: 0,
  });
  const [acceptPending, setAcceptPending] = useState(false); // <-- new state

  if (!report) return <p>Report not found. Please go back.</p>;

  const severityColors = {
    LOW: "bg-green-600/80 text-white",
    MEDIUM: "bg-yellow-500/80 text-white",
    HIGH: "bg-red-600/80 text-white",
    CRITICAL: "bg-purple-700/80 text-white",
  };

  const handleReportClick = async (oldReport, newStatus) => {
    // Special case for Accepted -> just show reward input
    if (newStatus === "ACCEPTED") {
      setAcceptPending(true);
      return;
    }

    const updatedReport = { ...oldReport, status: newStatus };
    try {
      await updateReportById(updatedReport.id, updatedReport);
      setReport(updatedReport);
    } catch (error) {
      console.error("Failed to update report:", error);
    }
  };

  const handleSendReward = async () => {
    try {
      await postReward({ ...rewardData, title: report.title }, report.reportedBy);

      // Only after reward is sent → update status to ACCEPTED
      const updatedReport = { ...report, status: "ACCEPTED" };
      await updateReportById(updatedReport.id, updatedReport);
      setReport(updatedReport);

      setAcceptPending(false); // close input after sending
      setRewardData({ ...rewardData, points: 0 }); // reset field
    } catch (error) {
      console.error("Failed to send reward or update report:", error);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition mt-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-yellow-400">{report.title}</h2>
        <span
          className={`px-3 py-1 rounded-lg text-xs font-medium ${severityColors[report.severity]}`}
        >
          {report.severity}
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
        <div className="flex items-center gap-1">
          <User size={14} className="text-blue-400" />
          {report.reportedBy}
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-green-400" />
          {new Date(report.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h3 className="text-gray-300 font-medium">Description</h3>
        <p className="text-gray-400 text-md mt-1">{report.description}</p>
      </div>

      {/* Impact */}
      <div className="mb-4">
        <h3 className="text-gray-300 font-medium">Impact</h3>
        <p className="text-gray-400 text-md mt-1">{report.impact}</p>
      </div>

      {/* Steps */}
      <div className="mb-4">
        <h3 className="text-gray-300 font-medium">Steps to Reproduce</h3>
        <pre className="bg-gray-800 text-gray-300 text-sm rounded-lg p-3 whitespace-pre-wrap mt-1">
          {report.stepsToReproduce}
        </pre>
      </div>
     
     <div className="text-gray-300 py-3">
    <span className="font-small">Status :</span>{" "}
    <span className="text-emerald-400 text-sm font-semibold ">{report.status}</span>
    </div>

      {/* Vulnerability Type */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-300 font-medium">Vulnerability:</span>
        <span className="bg-red-500/80 text-white px-2 py-1 rounded-lg text-xs">
          {report.vulnerabilityType}
        </span>
      </div>

      {/* References */}
      {report.references && (
        <div className="mb-4">
          <a
            href={report.references}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-400 hover:underline text-sm"
          >
            Reference <ExternalLink size={14} />
          </a>
        </div>
      )}

      {/* Status */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          { label: "In Review", status: "IN_REVIEW", style: "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20" },
          { label: "Resolve", status: "RESOLVED", style: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" },
          { label: "Accept", status: "ACCEPTED", style: "bg-green-500/10 text-green-400 hover:bg-green-500/20" },
          { label: "Reject", status: "REJECTED", style: "bg-red-500/10 text-red-400 hover:bg-red-500/20" },
          { label: "Re-Open", status: "OPEN", style: "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20" }, 
        ].map(({ label, status, style }) => {
          let isDisabled = false;

          if (report.status === "OPEN" && status !== "IN_REVIEW") {
            isDisabled = true;
          } else if (report.status === "IN_REVIEW" && status !== "RESOLVED") {
            isDisabled = true;
          } else if (
            report.status === "RESOLVED" &&
            status !== "ACCEPTED" &&
            status !== "REJECTED"
          ) {
            isDisabled = true;
          } else if (
            (report.status === "ACCEPTED" || report.status === "REJECTED") &&
            status !== "OPEN"
          ) {
            isDisabled = true;
          }

          // Special case: if we clicked Accept but haven't sent reward yet → disable others
          if (acceptPending && status !== "ACCEPTED") {
            isDisabled = true;
          }

          const activeStyle = isDisabled ? "" : "ring-1 ring-inset ring-current shadow-lg";

          return (
            <button
              key={status}
              onClick={() => handleReportClick(report, status)}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-all duration-200
                         active:scale-95
                         ${style}
                         ${isDisabled ? "opacity-50 cursor-not-allowed" : activeStyle}`}
              disabled={isDisabled}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Reward Input (only shows when Accept clicked but not confirmed yet) */}
      {acceptPending && (
        <div className="w-full max-w-sm mt-4">
          <label className="block text-gray-300 mb-1">Reward Points</label>
          <div className="relative flex items-center">
            <input
              type="number"
              name="points"
              value={rewardData.points}
              onChange={(e) =>
                setRewardData({ ...rewardData, points: Number(e.target.value) })
              }
              min="0"
              step="1"
              placeholder="Enter points..."
              className="w-full p-3 pr-28 rounded-lg bg-gray-800/50 text-gray-100
                        border border-gray-700 focus:ring-2 focus:ring-red-500 
                        outline-none placeholder-gray-500"
            />

            <button
              onClick={handleSendReward}
              disabled={!rewardData.points || rewardData.points <= 0}
              className="absolute right-2 px-4 py-2 rounded-lg 
                        bg-red-600 hover:bg-red-500 text-white font-medium text-sm
                        disabled:opacity-40 disabled:cursor-not-allowed
                        transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
      )}

        {report.status === "ACCEPTED" && (
        <div className="mt-6 text-emerald-400 font-medium text-center">
            ✅ This report have been awarded with a reward amount!
        </div>
        )}
        {report.status === "REJECTED" && (
        <div className="mt-6 text-emerald-400 font-medium text-center">
            ❌ Unfortunately, this report has been rejected.
        </div>
        )}
    </div>
  );
};

export default SubmittedReportsDetailPage;
