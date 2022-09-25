import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import styles from './tooltip.css?inline'

export default component$(({ title }: { title?: string }) => {
  useStylesScoped$(styles)

  return (
    <div class={{ tooltip: true }} data-tooltip={title}>
      <Slot />
    </div>
  )
})
