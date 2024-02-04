/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors:{
        darker :'#1A1A1A',
        lightest : '#E0E1E0',
        lighter :'#D1D3D4',
      }
    },
  },
  plugins: [],
}

