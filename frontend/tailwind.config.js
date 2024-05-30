/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main_green: "#5CBF94",
        main_purple: "#5C156B",
        secondary_purple: "#CFCFFF"
      }
    },
  },
  plugins: [],
})

