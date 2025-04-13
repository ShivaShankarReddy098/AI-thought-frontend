import { useState } from "react";

const ThoughtFeed = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateThought = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/generate-thought");
    const data = await res.json();
    const newThought = {
      user: "🤖 Gemini AI",
      content: data.thought,
      likes: 0,
      comments: [],
    };
    setThoughts([newThought, ...thoughts]);
    setLoading(false);
  };

  const handleLike = (index) => {
    const updated = [...thoughts];
    updated[index].likes += 1;
    setThoughts(updated);
  };

  const handleComment = (index, comment) => {
    const updated = [...thoughts];
    updated[index].comments.push(comment);
    setThoughts(updated);
  };

  return (
    <div className="w-full min-h-screen bg-[#0d0d0d] text-[#00eaff] p-6 font-sans pt-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl ml-2">AI Thought Feed</h2>
          <button
            onClick={generateThought}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/70 rounded-full hover:shadow-blue-400 hover:scale-105 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Generating..." : "+ Generate Thought"}
          </button>
        </div>

        {thoughts.map((thought, index) => (
          <div
            key={index}
            className="fade-in bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6 shadow-lg transition-all duration-300 hover:shadow-blue-500/40"
          >
            <h3 className="font-semibold text-xl mb-2 text-purple-300 tracking-wide">
              {thought.user}
            </h3>
            <p className="text-[#e0f7ff] whitespace-pre-wrap text-lg mb-4">
              {thought.content}
            </p>

            <div className="flex items-center gap-4 mb-3">
              <button
                onClick={() => handleLike(index)}
                className="text-sm px-4 py-1.5 bg-pink-600 text-white rounded-full hover:bg-pink-500 transition-all duration-150 shadow-pink-500/40 shadow-md"
              >
                ❤️ Like ({thought.likes})
              </button>
              <CommentForm onAdd={(comment) => handleComment(index, comment)} />
            </div>

            <div className="space-y-2 mt-2 text-sm text-white/80">
              {thought.comments.map((comment, i) => (
                <div
                  key={i}
                  className="bg-white/10 p-2 px-4 rounded-full w-fit"
                >
                  💬 {comment}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentForm = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const handleSubmit = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
  };
  return (
    <div className="flex items-center gap-2">
      <input
        className="px-3 py-1.5 rounded-full text-black text-sm bg-white/80 focus:outline-none focus:ring-2 ring-blue-500"
        placeholder="Add comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-3 py-1.5 bg-green-500 text-white rounded-full hover:bg-green-400 transition-all"
      >
        Post
      </button>
    </div>
  );
};

export default ThoughtFeed;
