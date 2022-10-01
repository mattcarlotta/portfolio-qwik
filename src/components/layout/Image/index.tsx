import type { HeightAndWidth, OptionalClassName } from '../../../types'
import calculateScale from '../../../utils/calculateScale'

export type ImageProps = HeightAndWidth &
  OptionalClassName & {
    alt?: string
    contentType: string
    priority?: boolean
    scale?: number
    url: string
  }

export default function Image({
  alt,
  className,
  contentType,
  height,
  scale = 0,
  url,
  width
}: ImageProps) {
  const isRescaled = scale !== 0
  const newHeight = isRescaled ? calculateScale(height, scale) : height
  const newWidth = isRescaled ? calculateScale(width, scale) : width
  const rescale = isRescaled ? `fit=scale&h=${newHeight}&w=${newWidth}` : ''

  return (
    <picture>
      <source
        src-set={`${url}?fm=webp${isRescaled ? `&${rescale}` : ''}`}
        type="image/webp"
      />
      <source
        src-set={`${url}${isRescaled ? `?${rescale}` : ''}`}
        type={contentType}
      />
      <img
        src={url}
        height={newHeight}
        width={newWidth}
        alt={alt}
        className={className}
      />
    </picture>
  )
}
