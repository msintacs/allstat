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
    },
  },
  plugins: [],
};
