import { RequestHandler } from '@builder.io/qwik-city'
import type { CONTENTFUL_BACKGROUND_PAGE } from '../../../types'
import { getBackground } from '../../../utils/contentfulApi'

export type BackgroundPage = CONTENTFUL_BACKGROUND_PAGE

export const onGet: RequestHandler<BackgroundPage> = async ({ response }) => {
  const res = await getBackground()

  const cards: CONTENTFUL_BACKGROUND_PAGE = res.data?.background

  if (!cards) {
    response.status = 404
    return null
  }

  return cards
}
