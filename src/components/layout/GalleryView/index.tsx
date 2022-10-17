import { $, component$, useStore } from '@builder.io/qwik'
import ImagesIcon from '../../../icons/ImagesIcon'
import type { CONTENTFUL_IMAGE } from '../../../types'
import BackgroundImageViewer from '../BackgroundImageViewer'
import Button from '../Button'
import CardTitle from '../CardTitle'
import DetailHeadline from '../DetailHeadline'
import GalleryButton from '../GalleryButton'
import Image from '../Image'
import Modal from '../Modal'
import SnapshotSelector from '../SnapshotSelector'

export type ModalDialogState = {
  currentIndex: number
  open: boolean
  image: {
    height: number
    width: number
    contentType: string
    description: string
    title: string
    url: string
  }
}

export default component$(
  ({ snapshots }: { snapshots: Array<CONTENTFUL_IMAGE> }) => {
    const initialStoreImage = {
      url: '',
      description: '',
      contentType: '',
      height: 0,
      width: 0,
      title: ''
    }
    const store = useStore<ModalDialogState>({
      currentIndex: 0,
      open: false,
      image: initialStoreImage
    })

    const snapsLength = snapshots.length

    const closeModal = $(() => {
      store.currentIndex = 0
      store.open = false
      store.image = initialStoreImage
    })

    const handleSelectImage = $((idx: number) => {
      const image = snapshots[idx]
      store.open = true
      store.currentIndex = idx
      store.image = image
    })

    const handleNextImage = $(() => {
      const nextIndex = store.currentIndex + 1
      const currentIndex = nextIndex <= snapsLength - 1 ? nextIndex : 0
      handleSelectImage(currentIndex)
    })

    const handlePrevImage = $(() => {
      const prevIndex = store.currentIndex - 1
      const currentIndex = prevIndex < 0 ? snapsLength - 1 : prevIndex
      handleSelectImage(currentIndex)
    })

    const handleKeyDown = $((event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlePrevImage()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleNextImage()
      }
    })

    return (
      <>
        <section>
          <DetailHeadline id="snapshots">Snapshots:</DetailHeadline>
          <div className="flex flex-wrap items-center justify-center px-2.5 my-4">
            {snapshots.map(({ title, ...rest }, idx) => (
              <GalleryButton
                onClick$={() => handleSelectImage(idx)}
                onKeyDown$={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleSelectImage(idx)
                  }
                }}
                ariaLabel={rest.description}
              >
                <CardTitle id={title}>{title}</CardTitle>
                <Image
                  className="mx-auto"
                  scale={25}
                  alt={rest.description}
                  {...rest}
                />
              </GalleryButton>
            ))}
          </div>
        </section>
        <Modal id="snapshot-gallery" open={store.open} onClose={closeModal}>
          <div className="fixed top-0 w-full">
            <div className="absolute top-5 left-5 font-plain text-2xl text-white">
              <ImagesIcon className="mr-2.5 align-middle" />
              {store.currentIndex + 1} of {snapsLength}
            </div>
            <h2
              role="presentation"
              className="mt-10 p-5 text-center text-md text-white sm:mt-0 sm:text-2xl"
              id="modal-title"
              data-testid="modal-title"
            >
              {store.image.title}
            </h2>
            <button
              aria-label="close modal"
              data-testid="close-modal"
              className="pointer absolute top-2 right-3 rounded border border-solid border-transparent bg-transparent py-1.5 px-3 text-3xl text-gray-100 transition-[color] duration-300 ease-in-out hover:text-fire focus:border focus:border-solid focus:border-primary-100"
              type="button"
              onClick$={closeModal}
            >
              &#10006;
            </button>
          </div>
          <div className="fixed left-1 top-[calc(50%-35px)]">
            <Button
              ariaLabel="View previous image"
              className="rotate-180 border border-solid border-transparent text-[3rem] focus:border focus:border-solid focus:border-primary-100"
              disabled={snapsLength <= 1}
              onClick$={handlePrevImage}
            >
              &#10144;
            </Button>
          </div>
          <div className="fixed bottom-24 left-20 right-20 top-20">
            <BackgroundImageViewer src={store.image.url} />
          </div>
          <div className="fixed right-1 top-[calc(50%-35px)]">
            <Button
              ariaLabel="View next image"
              className="border border-solid border-transparent text-[3rem] focus:border focus:border-solid focus:border-primary-100"
              disabled={snapsLength <= 1}
              onClick$={handleNextImage}
            >
              &#10144;
            </Button>
          </div>
          <div className="fixed left-0 bottom-0 w-full">
            <div
              data-testid="gallery-preview"
              role="listbox"
              aria-activedescendant={`button-preview-${store.image.title}`}
              aria-labelledby={`button-preview-${store.image.title}`}
              tabIndex={snapsLength <= 1 ? -1 : 0}
              onKeyDown$={handleKeyDown}
              className="overflow-y-auto whitespace-nowrap text-center"
            >
              {snapshots.map((snapshot, idx) => (
                <SnapshotSelector
                  {...snapshot}
                  active={store.currentIndex === idx}
                  aria-label={snapshot.title}
                  onClick$={() => handleSelectImage(idx)}
                />
              ))}
            </div>
          </div>
        </Modal>
      </>
    )
  }
)
