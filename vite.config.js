import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path untuk production
  // Untuk Vercel, gunakan '/' (root path)
  // Untuk GitHub Pages, gunakan '/portfolio_gaztudio.id/'
  base: process.env.NODE_ENV === 'production' && process.env.VERCEL ? "/" : "/portfolio_gaztudio.id/",
})