import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'
const fs = require('fs')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  define: {
    'process.env': {...process.env, VERSION: require('./package.json').version}
    // 'server.hmr.overlay': false
    // 'server.hmr': false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  // devServer: {
  //   disableHostCheck: true,
  //   port: 8553,
  //   host: 'https://www.dminerweb.com.br',
  //   //key: fs.readFileSync('./certs/xxxxxx.pem'),
  //   //cert: fs.readFileSync('./certs/xxxxxx.pem'),
  //   pfx: fs.readFileSync('src/assets/certificado.cer'),
  //   pfxPassphrase: 'xxxxxx',
  //   https: true,
  //   hotOnly: false
  // }
})
