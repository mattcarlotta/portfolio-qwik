import { DocumentHead, RequestHandler } from '@builder.io/qwik-city'
import type { CONTENTFUL_EXPLORATIONS_PAGE } from '../../../../types'
import concatTitle from '../../../../utils/concatTitle'
import { getExplorationBySlug } from '../../../../utils/contentfulApi'

export type ExplorationPage = CONTENTFUL_EXPLORATIONS_PAGE

export const onGet: RequestHandler<ExplorationPage> = async ({
  params,
  response
}) => {
  const res = await getExplorationBySlug(params.id)

  const exploration: ExplorationPage =
    res.data?.explorationsCollection?.items?.[0]

  if (!exploration) {
    response.status = 404
    return null
  }

  return exploration
}

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
