export const BOOK_PAGE = Object.freeze({
  index: 2,
  projects: 4
})

export const clamp = ({ value, minimum, maximum }) => (
  Math.min(Math.max(value, minimum), maximum)
)

export const createSheetStyles = ({
  totalSheetCount,
  flippedSheetCount,
  activeSheetIndex
}) => (
  Array.from({ length: totalSheetCount }, (_, sheetIndex) => ({
    zIndex: getSheetDepth({
      sheetIndex,
      activeSheetIndex,
      flippedSheetCount,
      totalSheetCount
    }),
    transform: `rotateY(${sheetIndex < flippedSheetCount ? -180 : 0}deg)`
  }))
)

export const createVirtualNavigationStyles = ({
  currentPage,
  direction,
  isSettling,
  isTurning,
  targetPage,
  totalSheetCount,
  turningSheetIndex
}) => {
  const revealedSheetIndex = direction > 0 ? targetPage : targetPage - 1
  const isClosingBook = direction < 0 && targetPage === 0
  const shouldNormalizeBackground = isSettling || isClosingBook
  const visiblePage = shouldNormalizeBackground ? targetPage : currentPage

  return Array.from({ length: totalSheetCount }, (_, sheetIndex) => {
    const isTurningSheet = sheetIndex === turningSheetIndex
    const isRevealedSheet = sheetIndex === revealedSheetIndex
    const isOriginalCover = isClosingBook && sheetIndex === 0
    const isFlipped = isTurningSheet
      ? (direction > 0 ? isTurning : !isTurning)
      : sheetIndex < visiblePage

    const restingDepth = getRestingSheetDepth({
      sheetIndex,
      flippedSheetCount: visiblePage,
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

const getSheetDepth = ({
  sheetIndex,
  activeSheetIndex,
  flippedSheetCount,
  totalSheetCount
}) => (
  sheetIndex === activeSheetIndex
    ? totalSheetCount + 1
    : getRestingSheetDepth({
      sheetIndex,
      flippedSheetCount,
      totalSheetCount
    })
)

const getRestingSheetDepth = ({
  sheetIndex,
  flippedSheetCount,
  totalSheetCount
}) => (
  sheetIndex < flippedSheetCount
    ? sheetIndex + 1
    : totalSheetCount - sheetIndex
)

export const getBookTransform = ({
  isNarrowViewport,
  flippedSheetCount,
  totalSheetCount
}) => {
  if (flippedSheetCount === 0) return 'translateX(0)'

  const isLastSheet = flippedSheetCount === totalSheetCount
  if (!isNarrowViewport) return `translateX(${isLastSheet ? 100 : 50}%)`

  return isLastSheet
    ? 'translateX(calc(72.5vw - 50%))'
    : 'translateX(calc(47vw - 50%))'
}
