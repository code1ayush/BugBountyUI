import React from "react";
import {
  Calendar,
  DollarSign,
  Shield,
  Globe,
  Mail,
  Tag,
  Star,
  FilePlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProgramDetail = ({program,id}) => {

  const navigate = useNavigate();
  const currentUserName = localStorage.getItem("user");
  const isOwner = program.createdBy === currentUserName;

  if (!program) return null;

  const handleReport = () =>{
    navigate(`/reportform/${id}`)
  }

  const handleSubmittedReport = (reports) =>{
    navigate('/submittedReports', {state:{reports}})
  }

  // console.log(program.submittedReport);
  

  return (
    <div className="mt-14 min-h-screen bg-gray-950 text-gray-100 flex justify-center p-3 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header / Banner */}
        <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
            <img
              src={program.image}
              alt={program.title}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover border border-gray-700 shadow-md mx-auto sm:mx-0"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">{program.title}</h1>
              <p className="text-gray-400">{program.companyName}</p>
              <div className="flex justify-center sm:justify-start items-center gap-2 mt-2 text-sm text-gray-400">
                <Calendar size={16} className="text-blue-400" />
                <span>
                  Created: {new Date(program.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          {/* Status Badge */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
            <span
              className={`px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full font-medium ${
                program.status === "ACTIVE"
                  ? "bg-green-600/30 text-green-400 border border-green-600/40"
                  : "bg-red-600/30 text-red-400 border border-red-600/40"
              }`}
            >
              {program.status}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-3 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-400 leading-relaxed text-justify hyphens-auto">
                {program.description}
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">Scope</h2>
              <p className="text-gray-400 leading-relaxed">{program.scope}</p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2 mt-1">
                {program.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-800 text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-gray-700 hover:border-blue-500 transition"
                  >
                    <Tag size={14} /> {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                Rewards
              </h2>
              <div className="flex items-center gap-2 text-gray-300">
                <DollarSign size={18} className="text-green-400" />
                <span className="font-medium">
                  {program.rewardRange}{" "}
                  {program.currency && `(${program.currency})`}
                </span>
              </div>
              {program.maxReward && (
                <p className="text-sm text-gray-400 mt-1">
                  Max Reward:{" "}
                  <span className="text-green-300 font-medium">
                    {program.maxReward} {program.currency}
                  </span>
                </p>
              )}
            </div>

            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                Program Type
              </h2>
              <p className="text-gray-300">{program.programType}</p>
            </div>

            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                Contact
              </h2>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={18} className="text-yellow-400" />
                <span>{program.contactEmail}</span>
              </div>
            </div>

            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                Policy
              </h2>
              {program.policyUrl ? (
                <a
                  href={program.policyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View Policy
                </a>
              ) : (
                <p className="text-gray-400">No policy provided</p>
              )}
            </div>
            {!isOwner && 
            <div>
              <button
                onClick={handleReport}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                <FilePlus size={20} />
                Create Report
              </button>
            </div>}
            {isOwner && 
            <div>
              <button
                onClick={()=>handleSubmittedReport(program.submittedReport)}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                <FilePlus size={20} />
                View Submitted Reports
              </button>
            </div>}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 bg-gray-900/80 px-6 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 sm:gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-purple-400" />
            <span>Reports: {program.reportCount || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-400" />
            <span>Resolved: {program.resolvedCount || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-cyan-400" />
            <span>Disclosure: {program.disclosurePolicy || "Not specified"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
