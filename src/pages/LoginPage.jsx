import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Helper to decode JWT and extract username
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("https://ai-thought-backend.vercel.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);

      const decoded = parseJwt(token);
      if (decoded?.username) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: decoded.username,
            user_id: decoded.user_id,
          })
        );
      }

      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen pt-28 flex flex-col md:flex-row font-sans bg-black text-white">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10 bg-black relative z-10 shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4 neon-glow">
          Welcome Back
        </h2>
        <p className="text-gray-400 mb-6 text-center tracking-wide px-4 md:px-0">
          Log in to <span className="text-purple-400">AI Thought</span> and join
          the futuristic conversation.
        </p>

        <input
          className="mb-4 px-4 py-2 w-full max-w-xs rounded-lg bg-gray-800 text-white border border-blue-500 focus:ring-2 focus:ring-cyan-500 outline-none transition duration-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-6 px-4 py-2 w-full max-w-xs rounded-lg bg-gray-800 text-white border border-blue-500 focus:ring-2 focus:ring-cyan-500 outline-none transition duration-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full max-w-xs py-2 bg-blue-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition duration-300 shadow-lg shadow-blue-500/30"
        >
          Login
        </button>

        <span className="text-sm flex flex-wrap text-center justify-center mt-4 text-gray-400">
          Don&apos;t have an account?
          <Link
            to="/signup"
            className="underline text-cyan-400 ml-2 hover:text-purple-400 transition"
          >
            Signup
          </Link>
        </span>
      </div>

      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-8">
        <div className="text-center px-4 md:px-10">
          <h2 className="text-3xl md:text-6xl font-bold text-[#E0E0E0] leading-tight drop-shadow-[0_0_6px_rgba(255,255,255,0.2)] mb-4">
            AI Thought
          </h2>

          <p className="text-lg text-gray-300 mb-2 tracking-wide">
            Enter the world of AI-powered thoughts and real-time connections.
          </p>

          <p className="text-md text-purple-400">
            The future is now. Be part of it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
