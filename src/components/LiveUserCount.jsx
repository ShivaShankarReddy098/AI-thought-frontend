import { useState, useEffect } from "react";

export default function LiveUserCount() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-lg font-bold bg-yellow-200 pt-20 pb-2 rounded-md text-blue-600">
      🔥 Live Users Online: {count}
    </div>
  );
}
