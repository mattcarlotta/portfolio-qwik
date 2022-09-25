import { Link as QwikLink } from '@builder.io/qwik-city'
import type {
  AriaLabel,
  Children,
  DataTestId,
  Href,
  OptionalClassName
} from '../../types'
import clsx from '../../utils/clsx'

export type LinkProps = AriaLabel &
  Children &
  DataTestId &
  Href &
  OptionalClassName & {
    asHref?: string
    noFocusRing?: boolean
    scroll?: boolean
  }

export default function Link({
  ariaLabel,
  children,
  className,
  dataTestId,
  href,
  noFocusRing
}: LinkProps) {
  return (
    <QwikLink
      aria-label={ariaLabel}
      data-testid={dataTestId}
      className={clsx(
        'flex w-full items-center justify-center rounded border-2 border-solid border-transparent text-primary no-underline transition-[box-shadow] duration-300 ease-in-out hover:text-white sm:mx-0 md:mx-1 md:w-auto md:p-2',
        className,
        noFocusRing
          ? ''
          : 'focus:border-primary-100 focus:text-white focus:shadow-ring'
      )}
      href={href}
      prefetch={false}
    >
      {children}
    </QwikLink>
  )
}
