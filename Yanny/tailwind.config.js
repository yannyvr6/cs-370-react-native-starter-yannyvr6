/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        accent: '#FF9500',
        background: '#F2F2F7',
        text: '#000000',
      },
      fontFamily: {
        regular: ['System'],
        mono: ['SpaceMono-Regular'],
        bold: ['System'],
        semibold: ['System'],
      },
    },
  },
  plugins: [],
}