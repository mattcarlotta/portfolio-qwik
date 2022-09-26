import { RequestHandler } from '@builder.io/qwik-city'
import type { CONTENTFUL_PROJECTS_PAGE } from '../../../../types'
import { getProjectBySlug } from '../../../../utils/contentfulApi'

export type ProjectCard = CONTENTFUL_PROJECTS_PAGE

export const onGet: RequestHandler<ProjectCard> = async ({
  params,
  response
}) => {
  const res = await getProjectBySlug(params.id)

  const project: CONTENTFUL_PROJECTS_PAGE =
    res.data?.projectsCollection?.items?.[0]

  if (!project) {
    response.status = 404
    return null
  }

  return project
}
