/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f0c29",
        primary: "#8e2de2",
        secondary: "#4a00e0",
        accent: "#00ffe7",
        text: "#ffffff",
        card: "#1f1b3a",
      },
      fontFamily: {
        futuristic: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
