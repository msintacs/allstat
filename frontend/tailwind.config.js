// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        suitThin: ["SUIT-Thin"],
        suitExtraLight: ["SUIT-ExtraLight"],
        suitLight: ["SUIT-Light"],
        suitRegular: ["SUIT-Regular"],
        suitMedium: ["SUIT-Medium"],
        suitSemiBold: ["SUIT-SemiBold"],
        suitBold: ["SUIT-Bold"],
        suitExtraBold: ["SUIT-ExtraBold"],
        suitHeavy: ["SUIT-Heavy"],
      },
      colors: {
        primary: "#4f46e5",
        secondary: "#06b6d4",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
};
