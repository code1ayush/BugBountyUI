import { useNavigate } from "react-router-dom";
import { ShieldCheck, Bug } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  // Define some random positions for bugs
  const bugPositions = [
    { x: -300, y: 300 },
    { x: 200, y: -50 },
    { x: -150, y: -120 },
    { x: 100, y: 200 },
    { x: 250, y: 150 },
    {x: 300, y: 300},
    {x: -200, y: 100}
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 overflow-hidden relative">
      {/* Animated Bugs in background */}
      {bugPositions.map((pos, i) => (
        <motion.div
          key={i}
          initial={{ x: pos.x, y: pos.y, opacity: 0 }}
          animate={{
            x: [pos.x, pos.x + (Math.random() * 200 - 100)],
            y: [pos.y, pos.y + (Math.random() * 200 - 100)],
            opacity: [0.3, 1, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute text-red-500"
        >
          <Bug className="w-6 h-6 opacity-60" />
        </motion.div>
      ))}

      {/* Logo / Top section */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Bug className="w-7 h-7 text-red-500" />
        <span className="text-xl font-bold tracking-wide">BugBounty</span>
      </div>

      {/* Hero content */}
      <div className="max-w-3xl text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Find Bugs. <span className="text-red-500">Secure Systems.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Join our community of ethical hackers and organizations. Report
          vulnerabilities, get rewarded, and make the internet a safer place.
        </p>

        <button
          onClick={() => navigate("/auth")}
          className="px-8 py-4 rounded-2xl text-lg font-semibold 
                     bg-red-500 hover:bg-red-600 transition-all 
                     shadow-lg shadow-red-500/30"
        >
          Register / Login
        </button>
      </div>

      {/* Bottom highlight */}
      <div className="absolute bottom-6 flex items-center gap-2 text-gray-400 text-sm">
        <ShieldCheck className="w-4 h-4" />
        <span>Trusted by researchers & companies worldwide</span>
      </div>
    </div>
  );
}
