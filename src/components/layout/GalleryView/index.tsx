import type { CONTENTFUL_IMAGE, HeightAndWidth, Title } from '../../../types'
import CardTitle from '../CardTitle'
import DetailHeadline from '../DetailHeadline'
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
          <div class="mx-2 my-1 max-h-60 max-w-sm border border-solid border-primary-400 bg-transparent text-center text-primary-100 overflow-hidden">
            <CardTitle id={title}>{title}</CardTitle>
            <Image
              className="mx-auto"
              scale={25}
              alt={rest.description}
              {...rest}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
