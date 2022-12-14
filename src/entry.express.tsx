import { qwikCity } from '@builder.io/qwik-city/middleware/node'
import compression from 'compression'
import env from 'dotenv'
import express from 'express'
import { join } from 'path'
import { fileURLToPath } from 'url'
import render from './entry.ssr'

env.config()

// Directories where the static assets are located
const distDir = join(fileURLToPath(import.meta.url), '..', '..', 'dist')
const buildDir = join(distDir, 'build')

// Create the Qwik City express middleware
const { router, notFound } = qwikCity(render)

// Create the express server
// https://expressjs.com/
const app = express()
app.use(compression())

// Static asset handlers
// https://expressjs.com/en/starter/static-files.html
app.use('/build', express.static(buildDir, { immutable: true, maxAge: '1y' }))
app.use(express.static(distDir, { redirect: false }))

// Use Qwik City's page and endpoint request handler
app.use(router)

// Use Qwik City's 404 handler
app.use(notFound)

// Start the express server
app.listen(process.env.PORT || 3000, () => {
  /* eslint-disable */
  console.log(process.env.VITE_HOST)
})
