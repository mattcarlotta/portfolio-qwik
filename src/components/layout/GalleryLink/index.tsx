import { component$, Slot, useStore, useStylesScoped$ } from '@builder.io/qwik'
import ImagesIcon from '../../../icons/ImagesIcon'
import Modal from '../Modal'
import styles from './gallerylink.css?inline'


export default component$(({ ariaLabel }: { ariaLabel: string }) => {
  const store = useStore<ModalState>({
    isOpen: false
  })

  useStylesScoped$(styles)

  return (
      <div
        class={{
          galleryLink: true
        }}
        role="button"
        onClick$={() => (store.isOpen = true)}
        aria-label={ariaLabel}
        tabIndex={0}
      >
        <Slot />
      </div>

  )
})
