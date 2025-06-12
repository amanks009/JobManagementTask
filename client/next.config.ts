/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // for app dir
    "./pages/**/*.{js,ts,jsx,tsx}", // for pages dir
    "./Component/**/*.{js,ts,jsx,tsx}", // for components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
