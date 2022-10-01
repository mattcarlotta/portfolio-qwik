import { RequestHandler } from '@builder.io/qwik-city'
import type { CONTENTFUL_PAGE_CARD } from '../../../types'
import { getHomepageCards } from '../../../utils/contentfulApi'

export type PageCards = Array<CONTENTFUL_PAGE_CARD>

export const onGet: RequestHandler<PageCards> = async ({ response }) => {
  const res = await getHomepageCards()

  const cards: PageCards = res.data?.homepageCardCollection?.items

  if (!cards) {
    response.status = 404
    return null
  }

  return cards
}
