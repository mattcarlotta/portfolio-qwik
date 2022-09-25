import { qwikCity } from '@builder.io/qwik-city/vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()]
  }
})
