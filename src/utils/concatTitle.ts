export default function concatTitle(title?: string, description?: string) {
  if (!title || !description) return ''

  return title
    .split(' ')
    .map((str) => str.charAt(0).toUpperCase().concat(str.slice(1)))
    .join(' ')
    .concat(` ${title && '-'} ${description} | Matt Carlotta`)
    .replace(/\./, '')
    .trim()
}
