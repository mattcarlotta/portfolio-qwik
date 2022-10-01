import type { CONTENTFUL_IMAGE, HeightAndWidth, Title } from '../../../types'
import CardTitle from '../CardTitle'
import DetailHeadline from '../DetailHeadline'
import GalleryLink from '../GalleryLink'
import Image from '../Image'

export type ModalDialogState = HeightAndWidth &
  Title & {
    contentType: string
    currentIndex: number
    description: string
    open: boolean
    url: string
  }

export default function GalleryView({
  snapshots
}: {
  snapshots: Array<CONTENTFUL_IMAGE>
}) {
  return (
    <section>
      <DetailHeadline id="snapshots">Snapshots:</DetailHeadline>
      <div className="my-4 flex flex-wrap items-center justify-center px-2.5">
        {snapshots.map(({ title, ...rest }) => (
          <GalleryLink
            ariaLabel={`Click to view the '${title}' image`}
            href={rest.url}
          >
            <CardTitle id={title}>{title}</CardTitle>
            <Image
              className="mx-auto"
              scale={25}
              alt={rest.description}
              {...rest}
            />
          </GalleryLink>
        ))}
      </div>
    </section>
  )
}
