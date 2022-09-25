import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import styles from './card.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  return (
    <div
      class={{
        card: true
      }}
    >
      <div data-title="placeholder" className="hidden" />
      <div data-title="card-container">
        <Slot />
      </div>
    </div>
  )
})
