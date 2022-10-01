import clsx from '../../../utils/clsx'
import type { Children, OptionalClassName } from './../../../types'

export type InfoProps = Children & OptionalClassName

export default function Info({ children, className }: InfoProps) {
  return (
    <p
      className={clsx(
        'my-2.5 break-all p-0 text-md sm:break-normal',
        className
      )}
    >
      {children}
    </p>
  )
}
