import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-black via-[#0c0c2c] to-[#1a0033] text-white flex items-center justify-center px-6 font-orbitron">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE CONTENT */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="grid text-4xl md:text-6xl font-bold text-[#E0E0E0] leading-tight drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
            <span>Think it.</span>
            <span>Feel it.</span>
            <span>Share it.</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-lg mx-auto md:mx-0 grid">
            <span>A new way to share your mind.</span>
            <span>
              No typing, no tapping - just pure thoughts and emotions.
            </span>
          </p>

          <div className="flex justify-center md:justify-start">
            <button className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-md hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30">
              <Link to="/dashboard">Join the Revolution</Link>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center items-center mt-4 md:mt-0">
          <img
            src="Seehalli1.png"
            alt="Seehalli Logo"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
