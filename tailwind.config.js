/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        'primary': '#84C7AE',
        'secondary' : '#C1E3D6',
        'bg-white': '#F6FBF9',
        'tx-primary': '#212B27',
        'tx-secondary': '#32403B'
      },
    },
  },
  plugins: [],
}