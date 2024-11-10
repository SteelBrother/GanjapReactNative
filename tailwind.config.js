// tailwind.config.js
module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#007bff",
          accent: "#00a680",
          light: "#f5f5f5",
        },
      },
    },
    plugins: [],
  };
  