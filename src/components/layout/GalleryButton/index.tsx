import { component$, QRL, Slot, useStylesScoped$ } from '@builder.io/qwik'
import styles from './gallerybutton.css?inline'

export type GalleryButtonProps = {
  ariaLabel: string
  onClick$: QRL<() => void>
  onKeyDown$: QRL<(event: KeyboardEvent) => void>
}

export default component$(
  ({ ariaLabel, onClick$, onKeyDown$ }: GalleryButtonProps) => {
    useStylesScoped$(styles)

    return (
      <div
        class={{
          galleryLink: true
        }}
        role="button"
        onClick$={onClick$}
        onKeyDown$={onKeyDown$}
        aria-label={ariaLabel}
        // @ts-ignore
        tabindex={0}
      >
        <Slot />
      </div>
    )
  }
)
