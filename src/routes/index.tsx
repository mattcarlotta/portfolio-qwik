import { component$, Resource, useResource$ } from '@builder.io/qwik'
import { DocumentHead } from '@builder.io/qwik-city'
import CardPreview from '../components/layout/CardPreview'
import Orbits from '../components/layout/Orbits'
import Section from '../components/layout/Section'
import { Data } from '../routes/api/background'

export default component$(() => {
  const res = useResource$<Data>(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/background`)

    if (!res.ok) {
      throw Error('No cards were found')
    }

    const data = await res.json()

    return { cards: data.cards }
  })

  return (
    <>
      <Section>
        <h1 className="blue-text-shadow m-0 text-3xl uppercase leading-none tracking-wider text-white sm:text-5xl">
          Matt Carlotta
        </h1>
        <h2 className="m-0 p-0 text-tiny text-primary sm:text-lg">
          Fullstack Software Engineer
        </h2>
        <Orbits />
      </Section>
      <Resource
        value={res}
        onRejected={(err) => <div>{String(err)}</div>}
        onResolved={(res) => (
          <section
            className="mt-28 flex flex-wrap items-center justify-center"
            data-testid="home-page"
          >
            {res?.cards.map(({ preview, slug, ...rest }) => (
              <CardPreview
                {...preview}
                {...rest}
                ariaLabel={`Navigate to my ${slug} page`}
                href={slug}
                alt={preview.description}
              />
            ))}
          </section>
        )}
      />
    </>
  )
})

export const head: DocumentHead = {
  meta: [
    {
      name: 'description',
      content:
        'A fullstack developer who is passionate about open-source projects, helping the web development community, and building SEO optimized applications'
    }
  ],
  title:
    'A fullstack developer who is passionate about open-source projects, helping the web development community, and building SEO optimized applications | Matt Carlotta'
}
