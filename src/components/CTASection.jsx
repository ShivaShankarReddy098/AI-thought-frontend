import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black py-24 px-6 md:px-20 text-white text-center relative z-10">
      <div className="max-w-4xl mx-auto p-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
          Ready to connect beyond words?
        </h2>
        {/* <p className="text-gray-300 text-lg mb-10">
          Join Seehalli and start generating thoughts powered by AI, connect
          with others, and experience the future of social networking.
        </p> */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-3 rounded-full shadow-md shadow-cyan-500/30 transition"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default CTASection;
