import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav K.",
    text: "AI Thought is like the future of social platforms. AI thoughts are mind-blowing and super creative!",
  },
  {
    name: "Diya R.",
    text: "Love how smooth the real-time chat is. The whole vibe feels neon-futuristic ✨",
  },
  {
    name: "Rishi V.",
    text: "Never seen a platform blend AI and social interaction this well. AI Thought feels like magic.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black py-24 px-6 md:px-20 text-white">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-cyan-400 mb-14">
        What People Are Saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative bg-white/10 backdrop-blur-md border border-blue-300/20 text-sm p-6 rounded-lg shadow-lg shadow-cyan-500/10"
          >
            <FaQuoteLeft className="text-cyan-400 text-xl mb-4" />
            <p className="text-gray-200 italic mb-6">{testimonial.text}</p>
            <p className="text-blue-300 font-bold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
