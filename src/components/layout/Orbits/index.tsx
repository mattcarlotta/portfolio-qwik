import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './orbits.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  return (
    <div
      class={{
        wrapper: true
      }}
    >
      <div
        class={{
          container: true
        }}
      >
        <div
          class={{
            circle: true,
            circleOne: true
          }}
        />
        <div
          class={{
            circle: true,
            circleTwo: true
          }}
        />
        <div
          class={{
            circle: true,
            circleThree: true
          }}
        />
        <div
          class={{
            circle: true,
            circleFour: true
          }}
        />
        <div
          class={{
            circle: true,
            circleFive: true
          }}
        />
      </div>
    </div>
  )
})
