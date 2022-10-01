import { component$, Resource, useResource$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import CardPreview from '../../components/layout/CardPreview'
import Section from '../../components/layout/Section'
import ExplorationsIcon from '../../icons/ExplorationsIcon'
import { ExplorationsCards } from '../api/explorations'

export default component$(() => {
  const resourceData = useResource$<ExplorationsCards>(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/explorations`)

    if (!res.ok) {
      throw Error('No explorations were found')
    }

    const data = await res.json()

    return data
  })

  return (
    <>
      <Section>
        <h1 className="break-words font-stylized text-xl leading-none sm:text-2xl md:text-3xl">
          <ExplorationsIcon className="mb-2 mr-2.5 text-2xl sm:mb-0" />
          Explorations
        </h1>
        <p className="mx-auto mt-2 max-w-2xl p-2 font-plain text-lg text-primary-25">
          A miscellaneous collection of works that vary from project-specific
          problem solving, to ground-up custom components, to answering
          stackoverflow questions.
        </p>
      </Section>
      <Resource
        value={resourceData}
        onRejected={(err) => <div>{String(err?.message)}</div>}
        onResolved={(explorations) => (
          <section className="mb-48 mt-20 flex flex-wrap items-center justify-center">
            {explorations.map(({ title, sandboxId, preview, ...rest }) => (
              <CardPreview
                {...preview}
                {...rest}
                active
                location={`https://${sandboxId}.csb.app`}
                ariaLabel={`Navigate to my ${title} exploration page`}
                href="explorations"
                source={`https://codesandbox.io/s/${sandboxId}`}
                status="In Orbit"
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
      name: 'og:type',
      content: 'article'
    },
    {
      name: 'description',
      content:
        "A small collection of codesandbox explorations I've created over the years"
    }
  ],
  title:
    "Explorations - A small collection of codesandbox explorations I've created over the years | Matt Carlotta"
}
