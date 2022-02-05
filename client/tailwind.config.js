module.exports = {
  darkMode: 'class',
  content: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        lightPrimary: "var(--light-bg-primary)",
        lightSecondary: "var(--light-bg-secondary)",
        darkPrimary: "var(--dark-color-bg-primary)",
        darkSecondary: "var(--dark-color-bg-secondary)",
      },
      textColor: {
        lightPrimary: "var(--light-text-primary)",
        lightSecondary: "var( --light-text-secondary)",
        lightAccent: "var(--light-text-accent)",
        darkPrimary: "var(--dark-color-text-primary)",
        darkSecondary: "var( --dark-color-text-secondary)",
        darkAccent: "var(--dark-color-text-accent)",
      },
    },
  },
  plugins: [require("tailwindcss"), require("precss"), require("autoprefixer")],
};
