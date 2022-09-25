import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div>
      <h1>Background</h1>
    </div>
  )
})

export const head: DocumentHead = {
  title:
    'Background - Learn about my journey on how I became a fullstack software engineer | Matt Carlotta '
}
