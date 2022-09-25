import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './bars.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  return (
    <div className="relative">
      <div
        data-title="bar"
        class={{
          bar: true,
          topBar: true
        }}
      />
      <div
        data-title="bar"
        class={{
          bar: true,
          middleBar: true
        }}
      />
      <div
        data-title="bar"
        class={{
          bar: true,
          bottomBar: true
        }}
      />
    </div>
  )
})
