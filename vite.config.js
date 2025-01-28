import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

export default defineConfig({
  plugins: [
    react(),
    vitePluginFaviconsInject('./src/logo.png')
  ],
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
      }
    }
  }
})