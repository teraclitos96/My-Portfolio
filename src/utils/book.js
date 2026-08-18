export const BOOK_DIRECTION = Object.freeze({
  backward: 'backward',
  forward: 'forward'
})

export const BOOK_SHEET = Object.freeze({
  about: 3,
  firstProject: 5,
  index: 2,
  projects: 4
})

export const BOOK_PAGE_TYPE = Object.freeze({
  about: 'about',
  backCover: 'back-cover',
  biography: 'biography',
  blank: 'blank',
  cover: 'cover',
  index: 'index',
  innerCover: 'inner-cover',
  projectDetails: 'project-details',
  projectOverview: 'project-overview',
  projects: 'projects'
})

export const BOOK_PAGE_NAVIGATION = Object.freeze({
  index: 'index',
  projects: 'projects'
})

export const clamp = ({ value, minimum, maximum }) => Math.min(Math.max(value, minimum), maximum)

export const createSheetStyles = ({ totalSheetCount, currentSheet, activeSheetIndex }) =>
  Array.from({ length: totalSheetCount }, (_, sheetIndex) => ({
    zIndex: getSheetDepth({
      sheetIndex,
      activeSheetIndex,
      currentSheet,
      totalSheetCount
    }),
    transform: `rotateY(${sheetIndex < currentSheet ? -180 : 0}deg)`
  }))

export const createVirtualNavigationStyles = ({
  currentSheet,
  direction,
  isSettling,
  isTurning,
  targetSheet,
  totalSheetCount,
  turningSheetIndex
}) => {
  const isMovingForward = direction === BOOK_DIRECTION.forward
  const isClosingBook = direction === BOOK_DIRECTION.backward && targetSheet === 0
  const revealedSheetIndex = isMovingForward ? targetSheet : targetSheet - 1
  const shouldNormalizeBackground = isSettling || isClosingBook
  const visibleSheet = shouldNormalizeBackground ? targetSheet : currentSheet

  return Array.from({ length: totalSheetCount }, (_, sheetIndex) => {
    const isTurningSheet = sheetIndex === turningSheetIndex
    const isRevealedSheet = sheetIndex === revealedSheetIndex
    const isOriginalCover = isClosingBook && sheetIndex === 0
    const isFlipped = isTurningSheet
      ? isMovingForward
        ? isTurning
        : !isTurning
      : sheetIndex < visibleSheet

    const restingDepth = getRestingSheetDepth({
      sheetIndex,
      currentSheet: visibleSheet,
      totalSheetCount
    })

    return {
      zIndex: isTurningSheet
        ? totalSheetCount + 1
        : isRevealedSheet
          ? totalSheetCount
          : restingDepth,
      transform: `rotateY(${isFlipped ? -180 : 0}deg)`,
      ...(isOriginalCover ? { visibility: 'hidden' } : {}),
      ...(shouldNormalizeBackground && !isTurningSheet && !isRevealedSheet
        ? { transition: 'none' }
        : {})
    }
  })
}

const getSheetDepth = ({ sheetIndex, activeSheetIndex, currentSheet, totalSheetCount }) =>
  sheetIndex === activeSheetIndex
    ? totalSheetCount + 1
    : getRestingSheetDepth({
      sheetIndex,
      currentSheet,
      totalSheetCount
    })

const getRestingSheetDepth = ({ sheetIndex, currentSheet, totalSheetCount }) =>
  sheetIndex < currentSheet ? sheetIndex + 1 : totalSheetCount - sheetIndex

export const getBookTransform = ({ isNarrowViewport, currentSheet, totalSheetCount }) => {
  if (currentSheet === 0) return 'translateX(0)'

  const isLastSheet = currentSheet === totalSheetCount
  if (!isNarrowViewport) return `translateX(${isLastSheet ? 100 : 50}%)`

  return isLastSheet ? 'translateX(calc(72.5vw - 50%))' : 'translateX(calc(47vw - 50%))'
}
