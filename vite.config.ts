import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile()
  ],

  base: './',

  server: {
    host: '0.0.0.0',
    port: 5173,
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

        format: 'iife',

        entryFileNames: 'index.js',

        chunkFileNames: 'index.js',

        assetFileNames: 'index.[ext]',
      }
    }
  }
})
