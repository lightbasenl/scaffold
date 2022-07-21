/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        blue: {
          100: "#E7F1FF",
          200: "#C3DBFE",
          300: "#9FC5FD",
          400: "#589AFC",
          500: "#106EFB",
          600: "#0E63E2",
          700: "#0A4297",
          800: "#073271",
          900: "#05214B",
        },
        red: {
          100: "#FFEFED",
          200: "#FFD6D2",
          300: "#FFBEB7",
          400: "#FF8D80",
          500: "#FF5C4A",
          600: "#E65343",
          700: "#99372C",
          800: "#732921",
          900: "#4D1C16",
        },
        dark: {
          100: "#EAEAED",
          200: "#CACAD2",
          300: "#A9A9B6",
          400: "#696980",
          500: "#292949",
          600: "#252542",
          700: "#19192C",
          800: "#121221",
          900: "#0C0C16",
        },
      },
    },
  },
  plugins: [],
};
