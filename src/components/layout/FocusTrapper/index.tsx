import {
  $,
  component$,
  QRL,
  Slot,
  useClientEffect$,
  useRef,
  useStore
} from '@builder.io/qwik'
import { AccessibleElement } from '../../../types'
import {
  ACCESSIBLE_ELEMENTS,
  isFocusable
} from '../../../utils/accessibilityHelpers'
import clsx from '../../../utils/clsx'

export type FocusTrapperState = {
  tabIndex: number
  tabbableItems: Array<HTMLElement>
}

export type FocusTrapperProps = {
  className?: string
  onEscapePress: QRL<() => void>
}

export default component$(({ className, onEscapePress }: FocusTrapperProps) => {
  const store = useStore<FocusTrapperState>({
    tabIndex: -1,
    tabbableItems: []
  })

  const lastActiveElement = useRef<HTMLElement>()
  const focusTrapRef = useRef<HTMLDivElement>()

  const handleClick = $((event: MouseEvent) => {
    const tabbableItemIndex = store.tabbableItems.findIndex((node) =>
      node.isEqualNode(event.target as HTMLElement)
    )

    store.tabIndex = tabbableItemIndex >= 0 ? tabbableItemIndex : 0
  })

  const handleFocusTrap = $((event: KeyboardEvent) => {
    const { key, shiftKey } = event
    const tabPress = key === 'Tab'
    const escKey = key === 'Escape' || key === 'Esc'
    const tabItemsLength = store.tabbableItems.length - 1

    if (shiftKey && tabPress) {
      event.preventDefault()
      const prevIndex = store.tabIndex - 1
      const currentIndex = prevIndex < 0 ? tabItemsLength : prevIndex
      store.tabIndex = currentIndex
    } else if (tabPress) {
      event.preventDefault()
      const nextIndex = store.tabIndex + 1
      const currentIndex = nextIndex > tabItemsLength ? 0 : nextIndex
      store.tabIndex = currentIndex
    } else if (escKey) {
      event.stopPropagation()
      onEscapePress()
    }
  })

  useClientEffect$(() => {
    if (focusTrapRef.current) {
      lastActiveElement.current = document.activeElement as HTMLElement

      const tabbableItems = Array.from(
        focusTrapRef.current.querySelectorAll(ACCESSIBLE_ELEMENTS.join(','))
      ).filter((element) => isFocusable(element as AccessibleElement))

      store.tabbableItems = tabbableItems as Array<HTMLElement>
      store.tabIndex = 0
    }

    return () => {
      if (lastActiveElement.current) {
        lastActiveElement.current.focus()
      }
    }
  })

  useClientEffect$(({ track }) => {
    track(store, 'tabIndex')

    if (store.tabbableItems.length > 0) {
      store.tabbableItems[store.tabIndex]?.focus()
    }
  })

  return (
    <div
      data-testid="focus-trapper"
      role="presentation"
      className={clsx(className)}
      ref={focusTrapRef}
      onKeyDown$={handleFocusTrap}
      onClick$={handleClick}
    >
      <Slot />
    </div>
  )
})
