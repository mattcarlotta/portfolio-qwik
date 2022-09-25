import { component$ } from '@builder.io/qwik'
import { useDocumentHead, useLocation } from '@builder.io/qwik-city'

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const Head = component$(() => {
  const head = useDocumentHead()
  const loc = useLocation()

  return (
    <>
      <title>{head.title}</title>
      <link rel="canonical" href={loc.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="all" />
      <meta name="googlebot" content="all" />
      <link rel="dns-prefetch" href="https://images.ctfassets.net/" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="preload" as="image" href="/bg.webp" />
      <link rel="apple-touch-icon" sizes="192x192" href="/logo_192x192.png" />
      <link
        rel="preload"
        href="/fonts/Elemental.woff"
        as="font"
        type="font/woff"
        crossOrigin="anonymous"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={loc.href} />
      <meta
        property="og:site_name"
        content="Matt Carlotta - Fullstack Software Engineer"
      />
      <meta
        property="og:image"
        content="https://images.ctfassets.net/hb5otnhwin4m/5XlzNcNVgoachT9KBOv4TW/93e008136db547b48ce1dd4d8bfe5bf1/profile_300.png"
      />
      <meta
        property="og:image:secure_url"
        content="https://images.ctfassets.net/hb5otnhwin4m/5XlzNcNVgoachT9KBOv4TW/93e008136db547b48ce1dd4d8bfe5bf1/profile_300.png"
      />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta
        property="og:image:alt"
        content="A fullstack developer who is passionate about open-source projects, helping the web development community, and building SEO optimized applications"
      />
      <meta property="og:image:type" content="image/png" />
      <link rel="mask-icon" href="/logo_192x192.png" color="#01406C" />

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  )
})
