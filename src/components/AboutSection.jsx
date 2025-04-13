const AboutSection = () => {
  return (
    <div className="w-full  bg-black text-white py-20 px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Side */}
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-cyan-300 mb-4">
          What is AI Thought?
        </h2>
        <p className="text-lg text-gray-300">
        AI Thought is an AI-powered social network where creativity meets the
          future. Express your thoughts, generate AI-powered ideas, chat in
          real-time, and connect with a community of innovators.
        </p>
        <p className="mt-4 text-sm text-blue-400 font-light">
          Think it. Post it. Let AI inspire your next move.
        </p>
      </div>

      {/* Right Side - Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-cyan-500 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-cyan-500/40 transition duration-300">
          <h3 className="text-cyan-300 text-xl font-semibold">
            ⚡ AI Thought Generator
          </h3>
          <p className="text-gray-300 mt-2 text-sm">
            Generate unique, futuristic ideas using advanced AI.
          </p>
        </div>

        <div className="bg-white/5 border border-pink-500 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-pink-500/40 transition duration-300">
          <h3 className="text-pink-300 text-xl font-semibold">
            💬 Real-time Chat
          </h3>
          <p className="text-gray-300 mt-2 text-sm">
            Chat with other users instantly using our Socket-powered system.
          </p>
        </div>

        <div className="bg-white/5 border border-purple-500 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-purple-500/40 transition duration-300">
          <h3 className="text-purple-300 text-xl font-semibold">
            🧠 AI Suggestions
          </h3>
          <p className="text-gray-300 mt-2 text-sm">
            Get smart reply suggestions in your conversations powered by Gemini
            AI.
          </p>
        </div>

        <div className="bg-white/5 border border-blue-500 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-blue-500/40 transition duration-300">
          <h3 className="text-blue-300 text-xl font-semibold">
            🧬 Community Vibes
          </h3>
          <p className="text-gray-300 mt-2 text-sm">
            See what others are thinking and posting in a real-time AI feed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
