import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import styles from './gallerylink.css?inline'

export default component$(
  ({ ariaLabel, href }: { ariaLabel: string; href: string }) => {
    useStylesScoped$(styles)

    return (
      <a
        class={{
          galleryLink: true
        }}
        aria-label={ariaLabel}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Slot />
      </a>
    )
  }
)
