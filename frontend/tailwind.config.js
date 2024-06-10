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
        main_purple: "#2f156b",
        secondary_purple: "#e6e6fc"
      },
      backgroundImage: {
        'login-image': "url('assets/mmmotif.svg')"
      }
    },
  },
  plugins: [],
})

