import { component$, Resource } from '@builder.io/qwik'
import {
  DocumentHead,
  RequestHandler,
  useEndpoint
} from '@builder.io/qwik-city'
import NotFound from '../../../components/layout/NotFound'
import Section from '../../../components/layout/Section'
import ProjectsIcon from '../../../icons/ProjectsIcon'
import concatTitle from '../../../utils/concatTitle'
import { ExplorationPage } from '../../api/explorations/[id]'

export const onGet: RequestHandler<ExplorationPage> = async ({
  params,
  response
}) => {
  const res = await fetch(
    `${process.env.VITE_API_URL}/explorations/${params.id}`
  )

  if (!res.ok) {
    response.status = 404
    return null
  }

  const data = await res.json()

  return data
}

export default component$(() => {
  const resource = useEndpoint<typeof onGet>()

  return (
    <>
      <Resource
        value={resource}
        onRejected={() => <NotFound />}
        onResolved={(data) => (
          <Section>
            <h1 className="break-words font-stylized text-2xl leading-none md:text-3xl">
              <ProjectsIcon className="mb-2 mr-2.5 text-3xl sm:mb-0" />
              projects
            </h1>
            <p className="mx-auto mt-2 max-w-xl p-2 font-plain text-lg text-primary-25">
              {JSON.stringify(data, null, 2)}
            </p>
          </Section>
        )}
      />
    </>
  )
})

export const head: DocumentHead<ExplorationPage> = ({ data }) => {
  return !data
    ? {
        title: 'Exploration Not Found | Matt Carlotta'
      }
    : {
        meta: [
          {
            name: 'og:type',
            content: 'article'
          },
          {
            name: 'description',
            content: data.preview.description ?? ''
          }
        ],
        title: concatTitle(data.title, data.preview.description)
      }
}
