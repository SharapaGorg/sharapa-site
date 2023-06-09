/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    colors: {
      aqua : '#7289da',
      dark : '#1e2124',
      lessDark: '#282b30',
      gray : '#99aab5',
      white : 'white',
      black : 'black'
    },
    extend: {},
  },
  plugins: [],
}
