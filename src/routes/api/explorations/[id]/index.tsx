import { RequestHandler } from '@builder.io/qwik-city'
import type {
  CONTENTFUL_EXPLORATIONS_PAGE,
  CONTENTFUL_PROJECTS_PAGE
} from '../../../../types'
import { getExplorationBySlug } from '../../../../utils/contentfulApi'

export type ExplorationPage = CONTENTFUL_EXPLORATIONS_PAGE

export const onGet: RequestHandler<ExplorationPage> = async ({
  params,
  response
}) => {
  const res = await getExplorationBySlug(params.id)

  const exploration: CONTENTFUL_PROJECTS_PAGE =
    res.data?.explorationsCollection?.items?.[0]

  if (!exploration) {
    response.status = 404
    return null
  }

  return exploration
}
