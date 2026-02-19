/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,ts,scss,css}', // <--- muy importante
  ],
  theme: {
    theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    }
  }
}

  },
  plugins: [],
};
