import { RequestHandler } from '@builder.io/qwik-city'
import type { CONTENTFUL_PROJECTS_PAGE } from '../../../types'
import { getAllProjects } from '../../../utils/contentfulApi'

export type ProjectCards = Array<CONTENTFUL_PROJECTS_PAGE>

export const onGet: RequestHandler<ProjectCards> = async ({ response }) => {
  const res = await getAllProjects()

  const projects: ProjectCards = res.data?.projectsCollection?.items

  if (!projects) {
    response.status = 404
    return null
  }

  return projects
}
