import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserSearch from "../components/UserSearch";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [thoughts, setThoughts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 5;

  const [showModal, setShowModal] = useState(false);
  const [newThought, setNewThought] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  const fetchThoughts = async () => {
    try {
      const res = await axios.get(
        `https://ai-thought-backend.vercel.app/thoughts?limit=${LIMIT}&offset=${offset}`
      );
      const sorted = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setThoughts((prev) => [...prev, ...sorted]);
      setHasMore(res.data.length === LIMIT);
    } catch (err) {
      console.error("Error fetching thoughts", err);
    }
  };

  const handlePostThought = async () => {
    if (!newThought.trim()) return;
    try {
      await axios.post("https://ai-thought-backend.vercel.app/thoughts", {
        username,
        content: newThought,
      });
      setNewThought("");
      setShowModal(false);
      fetchThoughts();
    } catch (err) {
      console.error("Error posting thought", err);
    }
  };

  const generateAIThought = async () => {
    try {
      const res = await fetch("https://ai-thought-backend.vercel.app/generate-thought");
      const data = await res.json();
      if (data.thought) {
        const aiRes = {
          content: data.thought,
          username: "AI Thought",
          created_at: new Date(),
        };
        setThoughts((prev) => [aiRes, ...prev]);
      }
    } catch (err) {
      console.error("Error generating AI thought", err);
    }
  };

  useEffect(() => {
    setOffset(0);
    setThoughts([]);
  }, []);

  useEffect(() => {
    if (offset === 0) setThoughts([]);
    fetchThoughts();
  }, [offset]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-white font-futuristic px-4 md:px-6 pt-24">
        {/* Top Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Dashboard
            </h1>
            <p className="text-sm text-black/50">
              Welcome back, <span className="text-blue-600">{username}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md shadow-md hover:brightness-110 transition-all"
              onClick={generateAIThought}
            >
              ✨ Generate AI Thought
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-md shadow-md hover:brightness-110 transition-all"
              onClick={() => setShowModal(true)}
            >
              + Post Thought
            </button>
          </div>
        </div>

        {/* Responsive Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: User List */}
          <div className="w-full lg:w-1/3">
            <UserSearch />
          </div>

          {/* Right: Thought Feed */}
          <div className="w-full lg:w-2/3 space-y-6">
            <h2 className="text-xl font-semibold text-black">
              AI Thought Feed
            </h2>

            {thoughts.map((thought, index) => (
              <div
                key={index}
                className="bg-white border-2  rounded-lg p-4 hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center font-bold text-white">
                    {/* {thought.username[0]} */}
                    <img
                      src={`https://i.pravatar.cc/150?u=${thought.username}`}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-black">{thought.username}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(thought.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="mb-4 p-2 text-black/80">{thought.content}</p>

                <div className="flex items-center gap-6 text-sm text-gray-300 justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(thought.content);
                      alert("Thought copied to clipboard!");
                    }}
                    className="flex items-center gap-1 text-black/80 hover:bg-gray-200 hover:rounded-lg p-2"
                  >
                    🔗 Copy
                  </button>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="text-center mt-4 pb-4">
                <button
                  className="px-4 py-2 bg-white border-2 hover:bg-gray-200 rounded-md text-black"
                  onClick={() => setOffset(offset + LIMIT)}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Post Thought Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg border border-accent w-full max-w-md shadow-2xl">
              <h2 className="text-lg font-bold mb-4 text-accent">
                Post a New Thought
              </h2>
              <textarea
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                rows="4"
                placeholder="What's on your mind?"
                className="w-full p-3 rounded-md bg-background border border-secondary text-white focus:outline-none resize-none mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostThought}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-md hover:brightness-110 transition"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
