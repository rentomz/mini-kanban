/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#01959F',
        'primary-black': '#1E1F21',
        'natural': '#E0E0E0',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
