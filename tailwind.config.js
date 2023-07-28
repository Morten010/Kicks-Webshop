/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     colors: {
      "grayish": "#E7E7E3",
      "brand-yellow": "#FFA52F",
      "brand-blue": "#4A69E2",
      "brand-black": "#232321"
     }
    },
  },
  plugins: [],
}
