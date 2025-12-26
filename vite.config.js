import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path untuk production (GitHub Pages / Vercel)
  // Untuk development lokal, gunakan '/'
  base: process.env.NODE_ENV === 'production' ? "/portfolio_gaztudio.id/" : "/",
})