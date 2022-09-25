import { RequestHandler } from '@builder.io/qwik-city'
import type { CONTENTFUL_PAGE_CARD } from '../../types'
import { getHomepageCards } from '../../utils/contentfulApi'

export type BackgroundCards = Array<CONTENTFUL_PAGE_CARD>

export const onGet: RequestHandler<BackgroundCards> = async ({ response }) => {
  const res = await getHomepageCards()

  const cards: BackgroundCards = res.data?.homepageCardCollection?.items

  if (!cards) {
    response.status = 404
    return null
  }

  return cards
}
