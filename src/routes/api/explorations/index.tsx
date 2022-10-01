import { RequestHandler } from '@builder.io/qwik-city'
import type {
  CONTENTFUL_EXPLORATIONS_PAGE,
  CONTENTFUL_PROJECTS_PAGE
} from '../../../types'
import { getAllExplorations } from '../../../utils/contentfulApi'

export type ExplorationsCards = Array<CONTENTFUL_EXPLORATIONS_PAGE>

export const onGet: RequestHandler<ExplorationsCards> = async ({
  response
}) => {
  const res = await getAllExplorations()

  const explorations: Array<CONTENTFUL_PROJECTS_PAGE> =
    res.data?.explorationsCollection?.items

  if (!explorations) {
    response.status = 404
    return null
  }

  return explorations
}
