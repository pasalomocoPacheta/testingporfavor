import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base: "./"' es importante para que las referencias relativas funcionen
  base: './', 
  build: {
    // Esto elimina los hashes aleatorios de los nombres de archivo
    // para que sea más fácil reemplazarlos en HubSpot (siempre será index.js)
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})