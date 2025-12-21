import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tambahkan baris di bawah ini. Pastikan tulisannya persis sama:
  base: "/portfolio_gaztudio.id/",
})