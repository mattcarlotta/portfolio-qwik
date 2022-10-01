/* istanbul ignore file */
import GoHomeIcon from '../../icons/GoHomeIcon'
import type { Href, Title } from '../../types'
import Link from './Link'

export default function GoBack({ href, title }: Href & Title) {
  return (
    <div className="text-center">
      <Link ariaLabel={`Navigate back to ${title} page`} href={href}>
        <GoHomeIcon className="mr-1 align-middle text-xl" />
        go back to {title} page
      </Link>
    </div>
  )
}
