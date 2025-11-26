import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Visitor Form',
        short_name: 'Visitors',
        start_url: '/',
        display: 'standalone',
        background_color: 'rgba(29, 84, 185, 0.5)',
        theme_color: 'rgba(29, 84, 185, 0.5)',
        icons: []
      }
    })
  ]
})
