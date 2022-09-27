import { qwikCity } from '@builder.io/qwik-city/vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import env from 'dotenv'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  env.config()

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    server: {
      port: 3000
    }
  }
})
