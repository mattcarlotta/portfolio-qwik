import { component$, QRL, Slot } from '@builder.io/qwik'
import type { AriaLabel } from '../../../types'
import clsx from '../../../utils/clsx'

export type ButtonProps = AriaLabel & {
  disabled?: boolean
  className?: string
  onClick$: QRL<() => void>
}

export default component$(
  ({ ariaLabel, className, disabled, onClick$ }: ButtonProps) => {
    return (
      <button
        aria-label={ariaLabel}
        disabled={disabled}
        className={clsx(
          'rounded bg-transparent p-4 text-3xl transition-[color] duration-300 ease-in-out',
          !disabled
            ? 'cursor-pointer text-white hover:text-primary-25'
            : 'cursor-not-allowed text-off-black hover:text-off-black',
          className
        )}
        type="button"
        onClick$={onClick$}
      >
        <Slot />
      </button>
    )
  }
)
