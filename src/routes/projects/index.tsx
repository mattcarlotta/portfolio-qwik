import { component$, Resource, useResource$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import CardPreview from '../../components/layout/CardPreview'
import Section from '../../components/layout/Section'
import ProjectsIcon from '../../icons/ProjectsIcon'
import { ProjectCards } from '../api/projects'

export default component$(() => {
  const resourceData = useResource$<ProjectCards>(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`)

    if (!res.ok) {
      throw Error('No projects were found')
    }

    const data = await res.json()

    return data
  })

  return (
    <>
      <Section>
        <h1 className="break-words font-stylized text-2xl leading-none md:text-3xl">
          <ProjectsIcon className="mb-2 mr-2.5 text-3xl sm:mb-0" />
          projects
        </h1>
        <p className="mx-auto mt-2 max-w-xl p-2 font-plain text-lg text-primary-25">
          A collection of works that vary from fullstack web applications, to
          custom NPM packages, to standalone Mac OS and Linux applications.
        </p>
      </Section>
      <Resource
        value={resourceData}
        onRejected={(err) => <div>{String(err?.message)}</div>}
        onResolved={(projects) => (
          <section className="mb-48 mt-20 flex flex-wrap items-center justify-center">
            {projects.map(({ preview, seoDescription, ...rest }) => (
              <CardPreview
                {...preview}
                {...rest}
                ariaLabel={`Navigate to my ${rest.title} project page`}
                description={seoDescription}
                href="projects"
                alt={preview.description}
                trailingSlash
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
        "A collection of personal and professional projects that I've created over the years"
    }
  ],
  title:
    "Projects - A collection of personal and professional projects that I've created over the years | Matt Carlotta"
}
