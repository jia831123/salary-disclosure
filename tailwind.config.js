/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '0px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1920px',
    },
    fontFamily: {
      notoSans: ['ui-serif', 'Georgia'],
      pinyon: ['Pinyon Script'],
    },
  },
  plugins: [],
}
