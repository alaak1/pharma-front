/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#E67E22",
          dark: "#bf6519",
          light: "#EBD5AB",
        },
        green: {
          deep: "#628141",
          soft: "#8BAE66",
        },
        sand: "#EBD5AB",
      },
    },
  },
  plugins: [],
}
