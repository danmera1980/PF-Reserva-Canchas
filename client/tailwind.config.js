module.exports = {
  content: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fonts: {
        primaryFont: "--ff-primary",
        regular : "--fw-reg",
        strong: " --fw-bold"
      },
      colors: {
       fontColor: "--clr-font",
       dark: "--clr-dark"
      }
    },
  },
  plugins: [require("tailwindcss"), require("precss"), require("autoprefixer")],
};
