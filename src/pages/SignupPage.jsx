import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    const { username, email, password, confirmPassword } = form;

    if (!username || !email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (!validateEmail(email)) {
      return setError("Invalid email format.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setError("");

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      console.log({ username, email, password });
      navigate("/login");
    } else {
      const msg = await res.text();
      setError(msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen  flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-10 p-6 md:p-10 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-400 mb-6">
            Create Your Account
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 mb-6 rounded bg-gray-800 text-white"
            onChange={handleChange}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded font-bold text-white shadow-lg shadow-blue-500/50"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <span className="text-sm flex text-center justify-center mt-2 text-gray-300">
            Already have an account?
            <Link to="/login" className="underline text-blue-300 ml-2">
              Login
            </Link>
          </span>
        </div>
      </div>

      {/* Right - Info */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-black bg-opacity-40 text-center md:text-left">
        <h2 className="text-3xl md:text-6xl font-bold text-[#E0E0E0] leading-tight drop-shadow-[0_0_6px_rgba(255,255,255,0.2)] mb-4">
          Welcome to AI Thought
        </h2>
        <p className="text-lg text-gray-300 max-w-md">
          Join the next-gen AI-powered social platform. Think futuristic. Think
          AI Thought.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
