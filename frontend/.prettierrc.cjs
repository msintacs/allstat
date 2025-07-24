/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
};
