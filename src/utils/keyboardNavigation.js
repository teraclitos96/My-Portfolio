const NAVIGABLE_ITEM_SELECTOR = 'a[href], button:not([disabled])'
const BOOK_NAVIGATION_LIST_SELECTOR = '[data-book-navigation-page]'
const BOOK_PAGE_NAVIGATION_SELECTOR = '[data-book-page-navigation]'

const getActiveElement = () => window.document.activeElement

const hasFocusedElement = ({ selector }) => {
  const activeElement = getActiveElement()

  return activeElement instanceof window.HTMLElement &&
    Boolean(activeElement.closest(selector))
}

const clearFocus = ({ selector }) => {
  const activeElement = window.document.activeElement
  const isBookListItem = activeElement instanceof window.HTMLElement &&
    Boolean(activeElement.closest(selector))

  if (isBookListItem) activeElement.blur()
  return isBookListItem
}

export const clearBookNavigationFocus = () => {
  clearFocus({
    selector: `${BOOK_NAVIGATION_LIST_SELECTOR}, ${BOOK_PAGE_NAVIGATION_SELECTOR}`
  })
}

export const clearBookPageNavigationFocus = () => (
  clearFocus({ selector: BOOK_PAGE_NAVIGATION_SELECTOR })
)

export const isBookPageNavigationFocused = () => (
  hasFocusedElement({ selector: BOOK_PAGE_NAVIGATION_SELECTOR })
)

const getItems = ({ container }) => (
  container
    ? Array.from(container.querySelectorAll(NAVIGABLE_ITEM_SELECTOR))
    : []
)

const moveFocus = ({ items, direction }) => {
  if (items.length === 0) return false

  const currentIndex = items.indexOf(getActiveElement())
  const nextIndex = currentIndex === -1
    ? (direction > 0 ? 0 : items.length - 1)
    : (currentIndex + direction + items.length) % items.length

  items[nextIndex].focus()
  return true
}

const getBookListItems = ({ currentPage, preferLastList = false }) => {
  const lists = window.document.querySelectorAll(
    `[data-book-navigation-page="${currentPage}"]`
  )
  const list = preferLastList ? lists[lists.length - 1] : lists[0]

  return getItems({ container: list })
}

const getBookPageNavigationItems = ({ currentPage }) => {
  const navigation = window.document.querySelector(
    `[data-book-page-navigation="${currentPage - 1}"]`
  )

  return getItems({ container: navigation })
}

export const focusFirstBookListItem = ({
  currentPage,
  preferLastList = false
}) => {
  const [firstItem] = getBookListItems({ currentPage, preferLastList })
  if (!firstItem) return false

  firstItem.focus()
  return true
}

export const moveBookListFocus = ({ currentPage, direction }) => {
  const items = getBookListItems({ currentPage })
  return moveFocus({ items, direction })
}

export const focusFirstBookPageNavigationItem = ({ currentPage }) => {
  const [firstItem] = getBookPageNavigationItems({ currentPage })
  if (!firstItem) return false

  firstItem.focus()
  return true
}

export const moveBookPageNavigationFocus = ({ currentPage, direction }) => {
  const items = getBookPageNavigationItems({ currentPage })
  return moveFocus({ items, direction })
}
