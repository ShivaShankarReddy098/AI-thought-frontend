import { FaRobot, FaComments, FaUserShield } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot size={28} />,
    title: "AI Thought Generator",
    description:
      "Unleash your creativity with AI—crafted thoughts-futuristic,inspiring,and truly unique.",
  },
  {
    icon: <FaComments size={28} />,
    title: "Real-Time Chat",
    description:
      "Chat in real time and enjoy instant messaging enhanced by AI-powered suggestions.",
  },
  {
    icon: <FaUserShield size={28} />,
    title: "Web3 Identity",
    description:
      "Coming soon: Own your profile and content with secure Web3 authentication.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-32 px-6 md:px-20 bg-black text-white ">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-cyan-400 mb-14">
        Core Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/10 border border-cyan-300/20 rounded-xl p-6 shadow-lg shadow-blue-500/20 hover:scale-105 hover:shadow-cyan-500/30 transition-all duration-300"
          >
            <div className="text-cyan-400 mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-blue-300 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
