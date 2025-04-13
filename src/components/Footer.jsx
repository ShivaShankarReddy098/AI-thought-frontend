const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-4 sm:px-6 md:px-16 border-t border-blue-900 text-center sm:text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-8">
        {/* Logo & Tagline */}
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            <img
              src="/Seehalli1.png"
              alt="Logo"
              className="w-10 h-10 object-cover"
            />
            <h2 className="text-xl font-bold text-cyan-400">AI Thought</h2>
          </div>
          <p className="text-sm text-gray-400 max-w-xs mx-auto sm:mx-0">
            AI-powered social platform where thoughts meet technology.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row justify-center gap-16 sm:gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">Home</li>
              <li className="hover:text-cyan-400 cursor-pointer">Dashboard</li>
              <li className="hover:text-cyan-400 cursor-pointer">Chat</li>
              <li className="hover:text-cyan-400 cursor-pointer">AI Feed</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-400 cursor-pointer">Blog</li>
              <li className="hover:text-purple-400 cursor-pointer">GitHub</li>
              <li className="hover:text-purple-400 cursor-pointer">API Docs</li>
              <li className="hover:text-purple-400 cursor-pointer">Support</li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-pink-300 mb-3">Contact</h3>
          <p className="text-sm">📩 support@aithought.com</p>
          <p className="text-sm mt-1">📍 Bengaluru, Karnataka</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
            <a href="#" className="hover:text-pink-500">
              Twitter
            </a>
            <a href="#" className="hover:text-pink-500">
              Discord
            </a>
            <a href="#" className="hover:text-pink-500">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-xs text-gray-500 border-t border-blue-900 pt-6">
        © {new Date().getFullYear()} AI Thought. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
