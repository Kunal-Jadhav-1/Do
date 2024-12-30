/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#dda8a8',
        secondary: '#efede1',
        tertiary: "#ba8585",
        accent: "#edcccc",
      },
      textColor: {
        primary: '#dda8a8',
        secondary: '#efede1',
        tertiary: "#ba8585",
        accent: "#edcccc",
      },
      borderColor: {
        primary: '#dda8a8',
        secondary: '#efede1',
        tertiary: "#ba8585",
        accent: "#edcccc",
      },
      fontFamily: {
        sacramento: ['Sacramento', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
