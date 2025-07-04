import { useEffect, useState } from "react";


const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://ai-thought-backend.vercel.app/users-with-thoughts"
        );
        const data = await res.json();
        const sorted = data.sort((a, b) => b.is_online - a.is_online);
        const limited = sorted.slice(0, 10);
        setUsers(limited);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-white p-4 rounded-lg  border-2 border- max-h-[600px]">
      <h2 className="text-lg font-bold mb-4 text-black">User Search</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 rounded-md  border border-accent placeholder-black/40 text-black focus:outline-none"
      />

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-accent scrollbar-track-background">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 hover:bg-secondary/10 rounded-lg transition"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center font-bold text-white">
                {/* {user.username[0].toUpperCase()} */}
                <img
                  src={`https://i.pravatar.cc/150?u=${user.username}`}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover"
                />
                {user.is_online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <span className="text-black text-sm sm:text-base">
                {currentUser?.user_id === user.id
                  ? user.username
                  : user.username}
              </span>
            </div>
            <span className="text-black/55 text-xs sm:text-sm">
              {user.thought_count} thoughts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
