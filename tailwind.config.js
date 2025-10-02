/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A192F',
          dark: '#0A192F',
        },
        accent: {
          DEFAULT: '#64FFDA',
          vibrant: '#64FFDA',
        },
        background: {
          DEFAULT: '#F8FAFC',
          light: '#F8FAFC',
        },
        text: {
          DEFAULT: '#333333',
          dark: '#333333',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
