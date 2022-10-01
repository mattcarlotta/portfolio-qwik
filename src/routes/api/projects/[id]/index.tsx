import { DocumentHead, RequestHandler } from '@builder.io/qwik-city'
import type { CONTENTFUL_PROJECTS_PAGE } from '../../../../types'
import concatTitle from '../../../../utils/concatTitle'
import { getProjectBySlug } from '../../../../utils/contentfulApi'

export type ProjectPage = CONTENTFUL_PROJECTS_PAGE

export const onGet: RequestHandler<ProjectPage> = async ({
  params,
  response
}) => {
  const res = await getProjectBySlug(params.id)

  const project: ProjectPage = res.data?.projectsCollection?.items?.[0]

  if (!project) {
    response.status = 404
    return null
  }

  return project
}

export const head: DocumentHead<ProjectPage> = ({ data }) => {
  return !data
    ? {
        title: 'Project Not Found | Matt Carlotta'
      }
    : {
        meta: [
          {
            name: 'og:type',
            content: 'article'
          },
          {
            name: 'description',
            content: data.seoDescription ?? ''
          }
        ],
        title: concatTitle(data.title, data.seoDescription)
      }
}
