import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full z-50 fixed top-0 bg-white text-black shadow-md shadow-[#ffffff1a] font-orbitron">
      <div className="max-w-7xl mx-auto px-4 py-3  flex justify-between items-center ">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer flex items-center gap-2 tracking-widest  transition duration-200"
          onClick={() => navigate("/")}
        >
          <img
            src="Seehalli1.png"
            alt="Logo"
            className="w-10 h-10 object-cover"
          />
          <span className="glow-text ">AI Thought</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate(username ? "/dashboard" : "/signup")}
            className="text-black/80 hover:text-black/85 transition font-medium tracking-wide"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate(username ? "/chat" : "/signup")}
            className="text-black/80 hover:text-black/85 transition font-medium tracking-wide"
          >
            Chat
          </button>

          {username && (
            <div className="flex items-center gap-4">
              <span className="text-[#C0C0C0] flex items-center gap-1 font-semibold">
                {/* <FaUser className="text-purple-400" />  */}
                <img
                  src={`https://i.pravatar.cc/150?u=${username}`}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover"
                />
                {/* {username} */}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-600 font-bold transition tracking-wide"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 flex  flex-col gap-3 text-sm p-4">
          <button
            onClick={() => {
              navigate(username ? "/" : "/");
              setIsMenuOpen(false);
            }}
            className="text-black/80 hover:black/85 transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate(username ? "/dashboard" : "/signup");
              setIsMenuOpen(false);
            }}
            className="text-black/80 hover:text-black/85 transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate(username ? "/chat" : "/signup");
              setIsMenuOpen(false);
            }}
            className="text-black/80 hover:text-black/85 transition"
          >
            Chat
          </button>
          {username && (
            <div className="flex flex-col gap-2 ">
              {/* <span className="text-[#C0C0C0] flex items-center gap-1 font-semibold">
                {/* <FaUser className="text-purple-400 " /> */}
              {/* <img
                src={`https://i.pravatar.cc/150?u=${username}`}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover"
              /> */}
              {/* {username} */}
              {/* </span> */}
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-600 font-bold transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
