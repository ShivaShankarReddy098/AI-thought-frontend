const PreviewSection = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-black via-[#0b0c1d] to-black text-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400 leading-tight">
            Step into the Future of Social AI
          </h2>
          <p className="text-gray-400 text-lg">
            AI Thought is where AI meets your thoughts. Generate futuristic
            ideas, chat with real users in real-time, and be part of a social
            revolution powered by AI.
          </p>
          <ul className="list-disc list-inside text-cyan-300 text-md space-y-2">
            <li> Real-time conversations enhanced by AI</li>
            <li> Thoght feed curated by AI</li>
            <li> Immersive futuristic design with authentic presence</li>
            <li> Web3 identity integration coming soon</li>
          </ul>
        </div>

        {/* Preview Image */}
        <div className="relative">
          <div className="rounded-xl overflow-hidden backdrop-blur-2xl">
            <img
              src="/Seehalli1.png"
              alt="Seehalli Screenshot"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
