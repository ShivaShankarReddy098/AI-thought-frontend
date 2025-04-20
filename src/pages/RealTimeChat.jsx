import { useEffect, useState, useRef, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import socket from "../socket";
import Navbar from "../components/Navbar";
import { Send, MessageCircle, Video } from "lucide-react";

const RealTimeChat = () => {
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const usernameRef = useRef("");
  console.log(username);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const uname = decoded.username;
        setUsername(uname);
        usernameRef.current = uname;
        socket.emit("registerUser", uname);
      } catch (err) {
        console.error("Invalid token", err);
        return;
      }
    }

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users.filter((user) => user !== usernameRef.current));
    };

    const handlePrivateMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("privateMessage", handlePrivateMessage);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("privateMessage", handlePrivateMessage);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message || !selectedUser) return;

    const msgData = {
      username: usernameRef.current,
      message,
      timestamp: new Date().toISOString(),
      receiver: selectedUser,
    };

    socket.emit("privateMessage", msgData);
    setMessage("");
  };

  const handleSuggestMessage = async () => {
    try {
      const filteredMessages = messages.filter(
        (msg) =>
          (msg.username === usernameRef.current &&
            msg.receiver === selectedUser) ||
          (msg.username === selectedUser &&
            msg.receiver === usernameRef.current)
      );

      const response = await fetch(
        "https://ai-thought-backend.vercel.app/suggest-message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: usernameRef.current,
            to: selectedUser,
            previousMessages: filteredMessages,
          }),
        }
      );

      const data = await response.json();
      console.log(data.suggestion);

      const options = Array.isArray(data.suggestion) ? data.suggestion : [];

      setSuggestions(options.slice(0, 3));
    } catch (err) {
      console.error("Suggestion error:", err);
      alert("Failed to fetch AI suggestion");
    }
  };
  useEffect(() => {
    handleSuggestMessage();
  }, [messages]);

  const fetchPrivateMessages = useCallback(async (targetUser) => {
    try {
      const response = await fetch(
        "https://ai-thought-backend.vercel.app/get-private-messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: usernameRef.current,
            to: targetUser,
          }),
        }
      );

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col sm:flex-row h-[calc(100vh-4rem)] pt-16 font-sans">
        {/* Sidebar */}
        <div className="w-full sm:w-1/3 md:w-1/4 bg-[#1e1e2f] p-2 text-white border-r border-gray-700 h-[300px] sm:h-full overflow-y-auto">
          <div className="flex flex-col items-center justify-center p-2 sm:p-4">
            <img
              src={`https://i.pravatar.cc/150?u=${usernameRef.current}`}
              alt="Profile"
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
            />
            <p className="text-xl sm:text-2xl lg:text-3xl text-blue-400 font-bold tracking-wide mt-2 sm:mt-4">
              {usernameRef.current}
            </p>
          </div>
          <input
            type="text"
            placeholder="Search People"
            className="w-full px-2 py-1 lg:px-3 lg:py-2 rounded-2xl mt-2 sm:mt-4 bg-white text-white placeholder-gray-400 border-2"
          />
          <h2 className="text-base sm:text-lg md:text-xl font-semibold my-3 sm:mb-4">
            Online Users
          </h2>
          <ul className="space-y-1 sm:space-y-2">
            {onlineUsers.map((user) => {
              const userMessages = messages.filter(
                (msg) =>
                  (msg.username === user &&
                    msg.receiver === usernameRef.current) ||
                  (msg.username === usernameRef.current &&
                    msg.receiver === user)
              );
              const lastMsg = userMessages[userMessages.length - 1];

              const lastText = lastMsg?.message || "No messages yet";
              const lastTime = lastMsg
                ? new Date(lastMsg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <li
                  key={user}
                  className={`cursor-pointer flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                    selectedUser === user
                      ? "bg-blue-700"
                      : "hover:bg-[#2a2a3b] hover:scale-[1.01]"
                  }`}
                  onClick={() => {
                    setSelectedUser(user);
                    setSuggestions([]);
                    fetchPrivateMessages(user);
                  }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <img
                      src={`https://i.pravatar.cc/150?u=${user}`}
                      alt="Profile"
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <div className="text-xs sm:text-sm font-semibold truncate">
                        {user}
                      </div>
                      {lastTime && (
                        <div className="text-[10px] sm:text-xs text-gray-400 ml-1 sm:ml-2 whitespace-nowrap">
                          {lastTime}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 truncate max-w-[140px] sm:max-w-[180px]">
                      {lastText}
                    </div>
                  </div>

                  <div className="w-2 h-2 sm:w-3 sm:h-3 mt-1 bg-green-500 rounded-full animate-pulse" />
                </li>
              );
            })}
          </ul>
        </div>
        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-2 sm:p-4 pt-1 bg-white/30">
          {selectedUser && (
            <>
              <div className="flex flex-row items-center gap-2 sm:gap-3 border-b-2 p-2">
                <img
                  src={`https://i.pravatar.cc/150?u=${selectedUser}`}
                  alt="Profile"
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover"
                />
                <h3 className="text-base sm:text-lg font-semibold text-black/60">
                  {selectedUser}
                </h3>
              </div>
            </>
          )}

          <div className="flex-1 overflow-y-auto mb-2 sm:mb-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-[#1e1e2f] p-2 sm:p-4">
            {messages
              .filter(
                (msg) =>
                  (msg.username === usernameRef.current &&
                    msg.receiver === selectedUser) ||
                  (msg.username === selectedUser &&
                    msg.receiver === usernameRef.current)
              )
              .map((msg, index) => {
                const isSender = msg.username === usernameRef.current;
                const date = new Date(msg.timestamp);
                const timeStr = date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={index}
                    className={`flex items-end gap-1 sm:gap-2 ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isSender && (
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-600 flex items-center justify-center">
                        <img
                          src={`https://i.pravatar.cc/150?u=${msg.username}`}
                          alt="Profile"
                          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div className="max-w-[80%] sm:max-w-[70%]">
                      <div
                        className={`px-3 sm:px-6 py-2 sm:py-4 rounded-2xl relative ${
                          isSender
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-700 text-white rounded-bl-none"
                        }`}
                      >
                        <span className="block text-xs sm:text-sm font-medium opacity-80 mb-1">
                          {isSender ? "You" : msg.username}
                        </span>
                        <p className="text-xs sm:text-sm break-words">{msg.message}</p>
                      </div>
                      <div
                        className={`text-[10px] sm:text-xs mt-1 text-gray-400 ${
                          isSender ? "text-right" : "text-left"
                        }`}
                      >
                        {timeStr}
                      </div>
                    </div>
                    {isSender && (
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-purple-600 flex items-center justify-center">
                        <img
                          src={`https://i.pravatar.cc/150?u=${msg.username}`}
                          alt="Profile"
                          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            <div ref={messagesEndRef} />
          </div>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-2 sm:mb-3 flex gap-1 sm:gap-2 flex-wrap justify-center">
              {suggestions.map((sug, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setMessage(sug);
                    setSuggestions([]);
                  }}
                  className="cursor-pointer border-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm text-black transition"
                >
                  {sug}
                </div>
              ))}
            </div>
          )}

          {/* Message Input */}
          <div className="flex gap-2 mt-1 sm:mt-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#2e2e3e] border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="flex items-center gap-1 sm:gap-2 bg-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-blue-500/50 active:scale-95"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-semibold text-white">Send</span>
            </button>
          </div>
        </div>
        {/* Right Sidebar */}
        <div className="hidden md:block w-1/4 bg-gray-300 p-4 sm:p-6 border-l border-gray-300 pt-6 sm:pt-10">
          {selectedUser && (
            <>
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <input
                  type="text"
                  placeholder="Search People"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl mb-3 sm:mb-4 bg-white text-white placeholder-gray-400 border-2"
                />
                <img
                  src={`https://i.pravatar.cc/150?u=${selectedUser}`}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                />
                <h3 className="text-base sm:text-lg font-semibold text-black/60">
                  {selectedUser}
                </h3>
              </div>

              <div className="mt-4 sm:mt-6 grid grid-cols-2 justify-center items-center text-center gap-4 sm:gap-8">
                <button className="flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 text-white py-1.5 sm:py-2 rounded-full hover:bg-blue-700 transition text-sm">
                  <MessageCircle size={16} />
                  Chat
                </button>

                <button className="flex items-center justify-center gap-1 sm:gap-2 bg-purple-600 text-white py-1.5 sm:py-2 rounded-full hover:bg-purple-700 transition text-sm">
                  <Video size={16} />
                  Video Call
                </button>
              </div>

              <div className="mt-4 sm:mt-6">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold mb-2">
                  Attachments
                </p>
                <div className="flex gap-1 sm:gap-2">
                  {["PDF", "Video", "MP3", "Image"].map((type) => (
                    <div
                      key={type}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-gray-200 text-gray-800 rounded-md"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RealTimeChat;
