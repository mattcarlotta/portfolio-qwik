import type { Children } from '../../../types'

export type ProjectProps = Children

export default function Project({ children }: ProjectProps) {
  return <article className="my-8 rounded-t-xl shadow-glow">{children}</article>
}
