// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         "dark-100": "#1A1B26",
//         "dark-200": "#24283B",
//         "dark-300": "#414868",
//         "accent-100": "#7AA2F7",
//         "accent-200": "#BB9AF7",
//       },
//       dark: {
//         900: "#1a202c", // Dark background
//         700: "#2d3748", // Darker elements
//         600: "#4a5568", // Even darker
//       },
//       fontFamily: {
//         sans: ["Inter", "system-ui", "sans-serif"],
//       },
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-primary":
//           "linear-gradient(135deg, var(--accent-100), var(--accent-200))",
//         "gradient-dark":
//           "linear-gradient(180deg, var(--dark-100), var(--dark-200))",
//       },
//       boxShadow: {
//         glow: "0 0 20px 2px rgba(122, 162, 247, 0.4), 0 0 40px rgba(122, 162, 247, 0.2)",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode via the 'class' strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark Theme Colors
        "dark-100": "#1A1B26",
        "dark-200": "#24283B",
        "dark-300": "#414868",
        "accent-100": "#7AA2F7",
        "accent-200": "#BB9AF7",
        "dark-text": "#E5E9F0", // Text color for dark mode

        // Light Theme Colors
        "light-100": "#F8FAFC", // Light background
        "light-200": "#E2E8F0", // Secondary light background
        "light-300": "#CBD5E1", // Borders or light accents
        "light-text": "#1A202C", // Text color for light mode
        "light-accent": "#3182CE", // Accent for light mode
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(135deg, var(--accent-100), var(--accent-200))",
        "gradient-dark":
          "linear-gradient(180deg, var(--dark-100), var(--dark-200))",
        "gradient-light":
          "linear-gradient(180deg, var(--light-100), var(--light-200))",
      },
      boxShadow: {
        glow: "0 0 20px 2px rgba(122, 162, 247, 0.4), 0 0 40px rgba(122, 162, 247, 0.2)",
      },
    },
  },
  plugins: [],
};
