import { component$ } from '@builder.io/qwik'
import { DocumentHead } from '@builder.io/qwik-city'
import Orbits from '../components/layout/Orbits'
import Section from '../components/layout/Section'

export default component$(() => {
  return (
    <>
      <Section>
        <h1 className="blue-text-shadow m-0 text-3xl uppercase leading-none tracking-wider text-white sm:text-5xl">
          Matt Carlotta
        </h1>
        <h2 className="m-0 p-0 text-tiny text-primary sm:text-lg">
          Page Not Found
        </h2>
        <Orbits />
      </Section>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Page Not Found | Matt Carlotta'
}
