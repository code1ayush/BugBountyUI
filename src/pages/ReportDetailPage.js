// ReportDetailsPage.jsx
import { useLocation } from "react-router-dom";
import StatusStepper from '../components/StatusStepper';
import { ExternalLink, User, Calendar } from "lucide-react";

const ReportDetailPage = () => {

const { state } = useLocation();
  const report = state?.report;

  if (!report) return <p>Report not found. Please go back.</p>;

  const severityColors = {
    LOW: "bg-green-600/80 text-white",
    MEDIUM: "bg-yellow-500/80 text-white",
    HIGH: "bg-red-600/80 text-white",
    CRITICAL: "bg-purple-700/80 text-white",
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

      <div>
        <h3 className="text-gray-300 font-medium mb-2">Status</h3>
        <StatusStepper status={report.status} />
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
      
    </div>

  );
};

export default ReportDetailPage;
