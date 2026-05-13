/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          light: '#f0f7f0',
          DEFAULT: '#2e7d32',
          dark: '#1b5e20',
          accent: '#8bc34a',
        },
      },
      borderRadius: {
        'xl': '32px',
        'lg': '24px',
        'md': '16px',
        'sm': '12px',
      }
    },
  },
  plugins: [],
}
