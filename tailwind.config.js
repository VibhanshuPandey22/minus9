/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#EEEEEE", //lightest
        cyan: "#00ADB5", //mid1
        platinum: "#B1B1B1", //mid2
        bgGray: "#222831", //darkest
        extra: "#141010",
        extra2: "#019191",
      },
      fontFamily: {
        cuba: ["Playwrite CU", "cursive"],
        mukta: ["Mukta", "sans-serif"],
        marhey: ["Marhey", "sans-serif"],
      },
    },
  },
  plugins: [],
};
