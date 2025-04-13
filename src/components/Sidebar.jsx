export default function Sidebar() {
  return (
    <div className="bg-gray-900 w-1/4 mt-16 p-4  h-screen fixed text-blue-400">
      <ul className="space-y-4 text-lg font-semibold">
        <li className="hover:text-blue-600 cursor-pointer">🏠 Home</li>
        <li className="hover:text-blue-600 cursor-pointer">📩 Messages</li>
        <li className="hover:text-blue-600 cursor-pointer">🔔 Notifications</li>
        <li className="hover:text-blue-600 cursor-pointer">👤 Profile</li>
        <li className="hover:text-blue-600 cursor-pointer">⚙️ Settings</li>
      </ul>
    </div>
  );
}
