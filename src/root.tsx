import { component$ } from '@builder.io/qwik'
import { QwikCity, RouterOutlet } from '@builder.io/qwik-city'
import { Head } from './components/meta/head'
import './global.css'

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCity> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  return (
    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        <Head />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCity>
  )
})
