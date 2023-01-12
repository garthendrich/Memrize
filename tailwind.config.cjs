/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1f5fc",
          100: "#e5eefa",
          200: "#cfdff6",
          300: "#b2c9ef",
          400: "#93abe6",
          500: "#788fdc",
          600: "#5e6fcd",
          700: "#4e5cb4",
          800: "#414d92",
          900: "#232946",
        },
        stroke: "#121629",
      },
      boxShadow: {
        button: "0 4px",
      },
    },
  },
  plugins: [],
};
