import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [
      vue({
        template: {
          preprocessOptions: {
            pug: {
              basedir: './'
            }
          }
        }
      }),
      // Only add legacy plugin for demo builds, not library builds
      ...(isLib
        ? []
        : [
            legacy({
              targets: ['defaults', 'not IE 11']
            })
          ])
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // Use modern Sass API to avoid deprecation warnings
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: isLib
      ? {
          lib: {
            entry: resolve(__dirname, 'src/lib.js'),
            name: 'VueComments',
            fileName: format => `vue-comments.${format}.js`,
            formats: ['es', 'umd']
          },
          rollupOptions: {
            external: ['vue', 'pinia'],
            output: {
              globals: {
                vue: 'Vue',
                pinia: 'Pinia'
              }
            }
          },
          // Ensure we output to the correct directory for library builds
          outDir: 'dist'
        }
      : {
          outDir: 'dist-demo'
        },
    server: {
      port: 8080,
      open: true
    },
    test: {
      globals: true,
      environment: 'jsdom'
    }
  }
})
