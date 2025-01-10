/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app_green: "#47C68F",
        app_light_green: "#EBFFF6",
      }
    },
  },
  plugins: [],
}