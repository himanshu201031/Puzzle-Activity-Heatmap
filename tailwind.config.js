/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'activity-empty': '#EBEDF0',
        'activity-low': '#9BE9A8',
        'activity-medium': '#40C463',
        'activity-high': '#30A14E',
        'activity-intense': '#216E39',
      },
      borderRadius: {
        'cell': '2px',
      },
    },
  },
  plugins: [],
}
