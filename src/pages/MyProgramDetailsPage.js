// import React, { useEffect, useState } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import { useAppContext } from "../context/appContext";
// // import { ArrowLeft } from "lucide-react";
// import { getStorage, ref, deleteObject } from "firebase/storage";
// import ProgramDetailComp from "../components/ProgramDetail"

// const MyProgramDetails = () => {

//   const {deleteProgram,myPrograms , getMyPrograms,updateReportById,postReward } = useAppContext();

//   const user = localStorage.getItem("user")
//   // const navigate = useNavigate();
//   const { id } = useParams();


//   const [program, setProgram] = useState(null);
//   const [showModal,setShowModal] = useState(false)
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [rewardData,setRewardData] = useState({
//     programId:id,
//     title:"",
//     points:0
//   })

//   // const handleShowModel = () =>{
//   //   setShowModal(true);
//   // }

//   // const handleDelete = async () => {
//   //   try {
//   //     await deleteProgram(id);
//   //     await  getMyPrograms()
//   //     setShowModal(false);
//   //     navigate("/myprograms");
//   //     const storage = getStorage();
//   //     const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
//   //     const withoutBase = program.image.replace(baseUrl, "");
//   //     const pathStartIndex = withoutBase.indexOf("/o/") + 3;
//   //     const pathEndIndex = withoutBase.indexOf("?");
//   //     const fullPath = decodeURIComponent(withoutBase.substring(pathStartIndex, pathEndIndex));
//   //     const imageRef = ref(storage,fullPath ); // imagePath is the path where you stored the image in Firebase
//   //     await deleteObject(imageRef);
//   //   } catch (err) {
//   //     console.error("Delete failed:", err);
//   //   }
//   // };

//   useEffect(() => {
//     if (myPrograms.length === 0) {
//       getMyPrograms();
//     } else {
//       const found = myPrograms.find((p) => String(p.id) === id);
//       setProgram(found);
//     }
//   }, [myPrograms, id, getMyPrograms,user]);



//   if (!program)
//     return (
//       <div className="p-6 text-gray-400 text-center animate-pulse">
//         Loading program details...
//       </div>
//     );



//   // const handleBack = () => {
//   //     navigate("/myprograms");
//   // };

// const handleReportClick = async (report,newStatus) => {
//   const updatedReport = { ...report, status: newStatus };
//   setSelectedReport(updatedReport)
//   try {
//     await updateReportById(updatedReport.id, updatedReport);
//   } catch (error) {
//     console.error("Failed to update report:", error);
//   }
// };



//   return (
//     <>
//     <ProgramDetailComp program = {program}/>
// {/*     
// <div className="mt-8">
//       <h2 className="text-2xl font-bold mb-4 text-gray-200">
//         Submitted Reports
//       </h2>

//       {program.submittedReport && program.submittedReport.length > 0 ? (
//         <div className="space-y-4">
//           {program.submittedReport.map((report, index) => (
//             <div
//               key={index}
//               onClick={() => setSelectedReport(report)}
//               className="p-4 border border-gray-700 rounded-xl bg-gray-800 shadow-md hover:shadow-lg transition cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold text-red-400">
//                 {report.title || `Report #${index + 1}`}
//               </h3>
//               <p className="text-gray-300 mt-2 line-clamp-2">
//                 {report.status || "No description provided."}
//               </p>
//               <p className="text-gray-300 mt-2 line-clamp-2">
//                 {report.description || "No description provided."}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-400 p-6 border border-gray-700 rounded-xl">
//           No reports have been submitted yet.
//         </div>
//       )}

     
//       {selectedReport && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
//           <div className="bg-gray-900 rounded-xl p-6 m-3 w-full max-w-md shadow-lg border border-gray-700 relative">
//             <button
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//               onClick={() => setSelectedReport(null)}
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold text-red-400 mb-4">
//               {selectedReport.title}
//             </h2>
//             <p className="text-gray-300 mb-4">{selectedReport.description}</p>

//             <div className="text-sm text-gray-400 space-y-2">
//               <p>
//                 <span className="font-medium text-blue-400">Reported By:</span>{" "}
//                 {selectedReport.reportedBy}
//               </p>
//               <p>
//                 <span className="font-medium text-green-400">Date:</span>{" "}
//                 {selectedReport.createdAt
//                   ? new Date(selectedReport.createdAt).toLocaleDateString()
//                   : "N/A"}
//               </p>
//               <p>
//                 <span className="font-medium text-yellow-400">Status:</span>{" "}
//                 {selectedReport.status || "Pending"}
//               </p>

//   <div className="flex flex-wrap items-center gap-3">
//   {[
//     { label: "In Review", status: "IN_REVIEW", style: "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20" },
//     { label: "Resolve", status: "RESOLVED", style: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" },
//     { label: "Accept", status: "ACCEPTED", style: "bg-green-500/10 text-green-400 hover:bg-green-500/20" },
//     { label: "Reject", status: "REJECTED", style: "bg-red-500/10 text-red-400 hover:bg-red-500/20" },
//   ].map(({ label, status, style }) => {
//     // Determine if the button should be disabled
//     let isDisabled = false;
    
//     // Logic for disabling buttons based on the selected report's status
//     if (selectedReport.status === "OPEN" && status !== "IN_REVIEW") {
//       isDisabled = true;
//     } else if (selectedReport.status === "IN_REVIEW" && status !== "RESOLVED") {
//       isDisabled = true;
//     } else if (
//       selectedReport.status === "RESOLVED" &&
//       status !== "ACCEPTED" &&
//       status !== "REJECTED"
//     ) {
//       isDisabled = true;
//     } else if (
//       selectedReport.status === "ACCEPTED" ||
//       selectedReport.status === "REJECTED"
//     ) {
//       isDisabled = true;
//     }

//     // Define a separate style for active (not disabled) buttons
//     const activeStyle = isDisabled ? "" : "ring-1 ring-inset ring-current shadow-lg";

//     return (
//       <button
//         key={status}
//         onClick={() => handleReportClick(selectedReport, status)}
//         className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-all duration-200
//                    active:scale-95
//                    ${style}
//                    ${isDisabled ? "opacity-50 cursor-not-allowed" : activeStyle}`}
//         disabled={isDisabled}
//       >
//         {label}
//       </button>
//     );
//   })}
// </div>
//             </div>
//             <br></br>

        

//            {selectedReport.status === "ACCEPTED" && ( // Use && for cleaner conditional rendering
//   <div className="relative w-full max-w-sm">
//     <input
//       type="number"
//       name="points"
//       value={rewardData.points}
//       onChange={(e) =>
//         setRewardData({ ...rewardData, points: Number(e.target.value) })
//       }
//       min="0"
//       step="1"
//       className="w-full p-4 pl-5 pr-28 border border-neutral-700 rounded-xl bg-neutral-800 text-white
//                  focus:outline-none focus:ring-2 focus:ring-red-500/80 text-lg
//                  placeholder-neutral-500 no-arrows transition-all duration-300"
//       placeholder="Enter reward points..."
//     />
//     <button
//       onClick={() => postReward({ ...rewardData, title: program.title }, selectedReport.reportedBy)}
//       className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2
//                  bg-green-600 text-white font-semibold rounded-lg
//                  hover:bg-red-500 active:scale-95 transition-all duration-200
//                  disabled:bg-neutral-600 disabled:cursor-not-allowed"
//       disabled={!rewardData.points || rewardData.points <= 0}
//     >
//       Send
//     </button>
//   </div>
// )}
//           </div>
//         </div>
//       )}
//     </div> */}

//     </>
//   );
// };

// export default MyProgramDetails;
