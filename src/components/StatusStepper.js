import React from "react";

const StatusStepper = ({ status }) => {
  const steps = ["OPEN", "IN_REVIEW", "RESOLVED", "FINAL"];

  const finalLabel =
    status === "ACCEPTED"
      ? "ACCEPTED"
      : status === "REJECTED"
      ? "REJECTED"
      : "ACCEPTED / REJECTED";

  const displaySteps = [...steps.slice(0, -1), finalLabel];

  const currentIndex =
    status === "OPEN"
      ? 0
      : status === "IN_REVIEW"
      ? 1
      : status === "ACCEPTED" || status === "REJECTED"
      ? 3
      : 2;

  return (
    <div className="w-full">
      {/* Circles + Lines */}
      <div className="flex items-center w-full">
        {displaySteps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Circle */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-[10px] z-10 ${
                index <= currentIndex
                  ? status === "REJECTED" && index === 3
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-green-500 bg-green-500 text-black"
                  : "border-gray-400 bg-gray-900 text-gray-400"
              }`}
            />

            {/* Line */}
            {index < displaySteps.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  index < currentIndex
                    ? status === "REJECTED" && index >= 2
                      ? "bg-red-500"
                      : "bg-green-500"
                    : "border-t-2 border-dotted border-gray-400"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Labels (aligned under circles) */}
      <div className="flex justify-between mt-2">
        {displaySteps.map((step, index) => (
    <span
      key={step}
      className={`text-xs text-center ${
        index === displaySteps.length - 2 ? "w-31" : "w-20"
      } ${
        index <= currentIndex
          ? status === "REJECTED" && index === 3
            ? "text-red-500 font-medium"
            : "text-green-500 font-medium"
          : "text-gray-400"
      }`}
    >
      {step.replace("_", " ")}
    </span>
  ))}
      </div>
    </div>
  );
};

export default StatusStepper;
