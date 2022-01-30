module.exports = {
  content: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("precss"), require("autoprefixer")],
};
