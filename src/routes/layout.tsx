import { component$, Slot } from '@builder.io/qwik'
import HEADERLINKS from '../components/layout/HEADERLINKS'
import Link from '../components/navigation/Link'

export default component$(() => {
  return (
    <div>
      <nav className="p-4 lg:mb-0 lg:pt-10">
        <div className="mx-auto flex max-w-sm flex-wrap place-content-around items-center md:flex-nowrap">
          {HEADERLINKS.map(({ Icon, href, page }) => (
            <Link
              className="my-1.5 p-2.5 text-tiny lg:my-0 lg:mx-2"
              ariaLabel={`Navigate to my ${page} page`}
              href={href}
            >
              <Icon className="mr-2 text-md" />
              {page}
            </Link>
          ))}
        </div>
      </nav>
      <main className="mx-auto h-full w-full max-w-main px-2.5 lg:px-0">
        <div className="min-h-body p-2.5 md:p-0">
          <Slot />
        </div>
      </main>
      <footer className="mt-14 pb-2 text-center">
        <p className="text-tiny font-bold text-accent">
          &#169;{new Date().getFullYear()} Matt Carlotta
        </p>
      </footer>
    </div>
  )
})
