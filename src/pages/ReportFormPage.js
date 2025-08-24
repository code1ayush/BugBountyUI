import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const ReportFormPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const owner = localStorage.getItem("user");

  const {postReport} = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    programId: id,
    reportedBy: owner,
    title: "",
    description: "",
    severity: "LOW",
    status: "OPEN",
    createdAt: new Date().toISOString(),
    updatedAt: "",
    assignee: "",
    vulnerabilityType: "",
    stepsToReproduce: "",
    impact: "",
    references: "",
    reporterScore: 0,
    isDuplicate: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };



   const handleSubmit = async(e) => {
    e.preventDefault();
    navigate(`/programs/${id}`)
    await postReport(formData);
    setFormData({
      programId: id,
    reportedBy: owner,
    title: "",
    description: "",
    severity: "LOW",
    status: "OPEN",
    createdAt: new Date().toISOString(),
    updatedAt: "",
    assignee: "",
    vulnerabilityType: "",
    stepsToReproduce: "",
    impact: "",
    references: "",
    reporterScore: 0,
    isDuplicate: false,
    })
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-2 pt-16">
      <div className="w-full max-w-3xl bg-gray-800/60 rounded-2xl shadow-lg border border-gray-700 p-4 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-emerald-400 text-center">
          Submit New Bug Report
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Program ID */}
          <div>
            <label className="block text-gray-300 mb-1">Program ID</label>
            <input
              type="text"
              name="programId"
              value={formData.programId}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
              readOnly
            />
          </div>

          {/* Reported By */}
          <div>
            <label className="block text-gray-300 mb-1">Reported By</label>
            <input
              type="text"
              name="reportedBy"
              value={formData.reportedBy}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              readOnly
            />
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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

          {/* Severity */}
          <div>
            <label className="block text-gray-300 mb-1">Severity</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
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
              <option value="OPEN">Open</option>
            </select>
          </div>

          {/* Vulnerability Type */}
          <div>
            <label className="block text-gray-300 mb-1">Vulnerability Type</label>
            <input
              type="text"
              name="vulnerabilityType"
              value={formData.vulnerabilityType}
              onChange={handleChange}
              placeholder="XSS, SQLi, CSRF..."
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-gray-300 mb-1">Assignee</label>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              placeholder="Assigned Reviewer"
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Steps to Reproduce */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Steps to Reproduce</label>
            <textarea
              name="stepsToReproduce"
              value={formData.stepsToReproduce}
              onChange={handleChange}
              rows="3"
              placeholder="1. Go to... 2. Click..."
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Impact */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">Impact</label>
            <textarea
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              rows="2"
              placeholder="Describe potential damage"
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* References */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-1">References</label>
            <input
              type="text"
              name="references"
              value={formData.references}
              onChange={handleChange}
              placeholder="https://owasp.org/..."
              className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default ReportFormPage
