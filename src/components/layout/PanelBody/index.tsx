import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import styles from './panelbody.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  return (
    <div class={{ panelBody: true }}>
      <Slot />
    </div>
  )
})
