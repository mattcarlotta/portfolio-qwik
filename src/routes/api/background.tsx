import { RequestHandler } from '@builder.io/qwik-city'
import type { CONTENTFUL_PAGE_CARD } from '../../types'
import { getHomepageCards } from '../../utils/contentfulApi'

export type BackgroundCards = Array<CONTENTFUL_PAGE_CARD>

export type Data = {
  cards: BackgroundCards
}

export const onGet: RequestHandler<Data> = async ({ response }) => {
  const res = await getHomepageCards()

  const cards: Array<CONTENTFUL_PAGE_CARD> =
    res.data?.homepageCardCollection?.items

  if (!cards) {
    response.status = 404
    return null
  }

  return {
    cards: []
  }
}
