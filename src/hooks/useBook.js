import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  BOOK_PAGE,
  clamp,
  createSheetStyles,
  createVirtualNavigationStyles,
  getBookTransform
} from '../utils/book'
import {
  clearBookNavigationFocus,
  clearBookPageNavigationFocus,
  focusFirstBookPageNavigationItem,
  focusFirstBookListItem,
  isBookPageNavigationFocused,
  moveBookPageNavigationFocus,
  moveBookListFocus
} from '../utils/keyboardNavigation'

const TURN_FALLBACK_DURATION = 700
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [contenteditable="true"]'
const EDITABLE_SELECTOR = 'input, select, textarea, [contenteditable="true"]'

const matchesTarget = ({ target, selector }) => (
  target instanceof window.Element && Boolean(target.closest(selector))
)

const useBook = ({ totalSheetCount, isNarrowViewport }) => {
  const [flippedSheetCount, setFlippedSheetCount] = useState(0)
  const [activeSheetIndex, setActiveSheetIndex] = useState(0)
  const [navigationTransition, setNavigationTransition] = useState(null)
  const [isLocked, setIsLocked] = useState(false)
  const timers = useRef([])
  const animationFrames = useRef([])
  const lock = useRef(false)
  const activeSheet = useRef(0)
  const transitionState = useRef(null)

  const clearScheduledWork = useCallback(() => {
    timers.current.forEach(clearTimeout)
    animationFrames.current.forEach(window.cancelAnimationFrame)
    timers.current = []
    animationFrames.current = []
  }, [])

  useEffect(() => clearScheduledWork, [clearScheduledWork])

  useEffect(() => {
    clearScheduledWork()
    lock.current = false
    activeSheet.current = 0
    transitionState.current = null
    setIsLocked(false)
    setNavigationTransition(null)
    setFlippedSheetCount(0)
    setActiveSheetIndex(0)
  }, [totalSheetCount, clearScheduledWork])

  const releaseLock = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    lock.current = false
    setIsLocked(false)
  }, [])

  const completeTurn = useCallback(() => {
    if (!lock.current) return

    timers.current.forEach(clearTimeout)
    timers.current = []

    const transition = transitionState.current
    if (!transition) {
      releaseLock()
      return
    }

    if (transition.isSettling) return

    const settlingTransition = {
      ...transition,
      isSettling: true,
      isTurning: true
    }

    transitionState.current = settlingTransition
    setFlippedSheetCount(transition.targetPage)
    setNavigationTransition(settlingTransition)

    const settleFrame = window.requestAnimationFrame(() => {
      const swapFrame = window.requestAnimationFrame(() => {
        transitionState.current = null
        setNavigationTransition(null)

        const resetFrame = window.requestAnimationFrame(() => {
          releaseLock()
          animationFrames.current = []
        })

        animationFrames.current.push(resetFrame)
      })

      animationFrames.current.push(swapFrame)
    })

    animationFrames.current.push(settleFrame)
  }, [releaseLock])

  const scheduleFallback = useCallback(() => {
    const fallbackTimer = setTimeout(completeTurn, TURN_FALLBACK_DURATION)
    timers.current.push(fallbackTimer)
  }, [completeTurn])

  const goTo = useCallback((destinationPage) => {
    if (lock.current) return

    const targetPage = clamp({
      value: destinationPage,
      minimum: 0,
      maximum: totalSheetCount
    })
    if (targetPage === flippedSheetCount) return

    clearBookNavigationFocus()
    lock.current = true
    setIsLocked(true)

    const direction = targetPage > flippedSheetCount ? 1 : -1
    const isAdjacentPage = Math.abs(targetPage - flippedSheetCount) === 1
    const nextActiveSheetIndex = direction > 0 ? targetPage - 1 : targetPage
    activeSheet.current = nextActiveSheetIndex
    setActiveSheetIndex(nextActiveSheetIndex)

    if (!isAdjacentPage) {
      const transition = {
        currentPage: flippedSheetCount,
        direction,
        isTurning: false,
        targetPage,
        turningSheetIndex: direction > 0
          ? flippedSheetCount
          : flippedSheetCount - 1
      }

      transitionState.current = transition
      setNavigationTransition(transition)

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(() => {
          setNavigationTransition({ ...transition, isTurning: true })
          transitionState.current = { ...transition, isTurning: true }
          animationFrames.current = []
          scheduleFallback()
        })

        animationFrames.current.push(secondFrame)
      })

      animationFrames.current.push(firstFrame)
      return
    }

    setFlippedSheetCount(targetPage)
    scheduleFallback()
  }, [flippedSheetCount, scheduleFallback, totalSheetCount])

  const handleSheetTransitionEnd = useCallback(({ event, sheetIndex }) => {
    const isSheetTransform = event.target === event.currentTarget &&
      event.propertyName === 'transform'

    if (isSheetTransform && sheetIndex === activeSheet.current) completeTurn()
  }, [completeTurn])

  useLayoutEffect(() => {
    const focusPage = navigationTransition?.targetPage ?? flippedSheetCount

    focusFirstBookListItem({
      currentPage: focusPage,
      preferLastList: navigationTransition?.direction < 0
    })
  }, [flippedSheetCount, navigationTransition])

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.defaultPrevented || event.repeat) return
      if (matchesTarget({ target: event.target, selector: EDITABLE_SELECTOR })) return

      if (event.key === 'ArrowDown') {
        const didMoveListFocus = !lock.current &&
          moveBookListFocus({ currentPage: flippedSheetCount, direction: 1 })
        const didFocusPageNavigation = !didMoveListFocus && !lock.current &&
          focusFirstBookPageNavigationItem({ currentPage: flippedSheetCount })

        if (didFocusPageNavigation || didMoveListFocus) event.preventDefault()
        return
      }

      if (event.key === 'ArrowUp') {
        const didLeavePageNavigation = clearBookPageNavigationFocus()
        if (didLeavePageNavigation) {
          event.preventDefault()
          return
        }

        const didMoveFocus = !lock.current && moveBookListFocus({
          currentPage: flippedSheetCount,
          direction: -1
        })

        if (didMoveFocus) event.preventDefault()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        if (isBookPageNavigationFocused()) {
          moveBookPageNavigationFocus({
            currentPage: flippedSheetCount,
            direction: 1
          })
        } else {
          goTo(flippedSheetCount + 1)
        }
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        if (isBookPageNavigationFocused()) {
          moveBookPageNavigationFocus({
            currentPage: flippedSheetCount,
            direction: -1
          })
        } else {
          goTo(flippedSheetCount - 1)
        }
        return
      }

      const shouldOpenClosedBook = event.key === 'Enter' &&
        flippedSheetCount === 0 &&
        !matchesTarget({ target: event.target, selector: INTERACTIVE_SELECTOR })

      if (shouldOpenClosedBook) {
        event.preventDefault()
        goTo(BOOK_PAGE.index)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [flippedSheetCount, goTo])

  const actions = useMemo(() => ({
    turnForward: sheetIndex => goTo(sheetIndex + 1),
    turnBackward: sheetIndex => goTo(sheetIndex),
    goTo,
    handleSheetTransitionEnd,
    toggleIndex: isMobileNav => {
      if (isMobileNav && flippedSheetCount > 0) goTo(0)
      else goTo(BOOK_PAGE.index)
    }
  }), [flippedSheetCount, goTo, handleSheetTransitionEnd])

  const view = useMemo(() => ({
    currentPage: flippedSheetCount,
    isLocked,
    isOpen: flippedSheetCount > 0,
    pointerEvents: isLocked ? 'none' : 'all',
    transform: getBookTransform({
      isNarrowViewport,
      flippedSheetCount: navigationTransition?.isTurning
        ? navigationTransition.targetPage
        : flippedSheetCount,
      totalSheetCount
    }),
    navigationTransition,
    sheetStyles: navigationTransition
      ? createVirtualNavigationStyles({
        ...navigationTransition,
        totalSheetCount
      })
      : createSheetStyles({
        totalSheetCount,
        flippedSheetCount,
        activeSheetIndex
      })
  }), [
    activeSheetIndex,
    flippedSheetCount,
    isLocked,
    isNarrowViewport,
    navigationTransition,
    totalSheetCount
  ])

  return { actions, view }
}

export default useBook
