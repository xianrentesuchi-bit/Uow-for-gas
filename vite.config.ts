import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),

    viteSingleFile(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Tube',
        short_name: 'Tube',
        description: 'Tube PWA',

        theme_color: '#ffffff',
        background_color: '#ffffff',

        display: 'standalone',

        start_url: './',

        scope: './',

        icons: [
          {
            src: 'android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'android-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],

  base: './',

  server: {
    host: '0.0.0.0',
    port: 5173
  },

  build: {
    target: 'es2015',

    assetsInlineLimit: 100000000,

    cssCodeSplit: false,

    modulePreload: false,

    rollupOptions: {
      output: {
        inlineDynamicImports: true,

        manualChunks: undefined,

        entryFileNames: 'index.js',

        chunkFileNames: 'index.js',

        assetFileNames: 'index.[ext]'
      }
    }
  }
})
