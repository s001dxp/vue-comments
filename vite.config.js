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
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/lib.js'),
        name: 'VueComments',
        fileName: (format) => `vue-comments.${format}.js`
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    } : {
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
