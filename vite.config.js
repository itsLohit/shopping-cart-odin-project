import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/shopping-cart-odin-project",
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
  },
})
