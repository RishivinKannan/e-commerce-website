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
      },
      keyframes:{
        textgradient:{
          '0%,100%':{backgroundPosition:'0% 25%'},
          '25%,75%':{backgroundPosition:'25% 50%'},
          '50%':{backgroundPosition:'100% 50%'},
        }
      },
      backgroundSize:{
        '300%':"300%",
      },
      animation:{
        gradient:'textgradient 5s ease infinite alternate',
        gradientonce:'textgradient 5s ease',
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar'),
  ],
}

