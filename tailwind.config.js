/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class", // important — we toggle .dark on <html> or <body>
  theme: {
    extend: {
      // add custom colors / fonts here if needed
    },
  },
  plugins: [],
}
