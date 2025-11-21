/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#693CC8', // Osano Purple
        dark: '#2D0D5B',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#6B7280', // Using Gray as requested for "Wrong"
      },
    },
  },
  plugins: [],
}
