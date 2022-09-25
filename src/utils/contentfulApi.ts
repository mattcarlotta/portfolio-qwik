import {
  BACKGROUND,
  EXPLORATIONS,
  HOMEPAGE_CARDS,
  PROJECTS
} from './contentfulGql'

function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `${process.env.VITE_CONTENTFUL_BASE_URL}${process.env.VITE_CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.VITE_CONTENTFUL_ACCESS_TOKEN
        }`
      },
      body: JSON.stringify({ query })
    }
  ).then((response) => response.json())
}

export function getHomepageCards() {
  return fetchGraphQL(
    `query {
      homepageCardCollection(order: sys_firstPublishedAt_DESC) {
        items {
          ${HOMEPAGE_CARDS}
        }
      }
    }
    `
  )
}

export function getBackground() {
  return fetchGraphQL(
    `query {
      background(id: "${process.env.VITE_CONTENTFUL_BACKGROUND_ID}") {
        ${BACKGROUND}
      }
    }
    `
  )
}

export function getExplorationBySlug(slug: string) {
  return fetchGraphQL(
    `query {
      explorationsCollection(where: { slug: "${slug}" }) {
        items {
          ${EXPLORATIONS}
        }
      }
    }
    `
  )
}

export function getAllExplorations() {
  return fetchGraphQL(
    `query {
      explorationsCollection(order: sys_firstPublishedAt_DESC) {
        items {
          ${EXPLORATIONS}
        }
      }
    }
    `
  )
}

export function getProjectBySlug(slug: string) {
  return fetchGraphQL(
    `query {
      projectsCollection(where: { slug: "${slug}" }) {
        items {
          ${PROJECTS}
        }
      }
    }
    `
  )
}

export function getAllProjects() {
  return fetchGraphQL(
    `query {
      projectsCollection(order: sys_firstPublishedAt_DESC) {
        items {
          ${PROJECTS}
        }
      }
    }
    `
  )
}