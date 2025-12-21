/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Kita timpa font bawaan 'sans' dengan 'Inter'
        sans: ['Inter', 'sans-serif'],
        // Kita timpa font bawaan 'serif' dengan 'Playfair Display'
        serif: ['Playfair Display', 'serif'],
      },
      // Tambahan animasi untuk Marquee jika belum ada di index.css
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}