import { act, fireEvent, renderHook } from '@testing-library/react'
import useBook from './useBook'

const renderBook = () => renderHook(() => useBook({
  totalSheetCount: 9,
  isNarrowViewport: false
}))

describe('useBook keyboard navigation', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  test('moves one sheet with the arrow keys', () => {
    const { result } = renderBook()

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(result.current.view.currentSheet).toBe(1)

    act(() => jest.advanceTimersByTime(700))
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(result.current.view.currentSheet).toBe(0)
  })

  test('opens a closed book directly at the index with Enter', () => {
    const { result } = renderBook()

    fireEvent.keyDown(window, { key: 'Enter' })

    expect(result.current.view.navigationTransition.targetSheet).toBe(2)
  })

  test('does nothing with Enter when the book is already open and unfocused', () => {
    const { result } = renderBook()

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    act(() => jest.advanceTimersByTime(700))
    fireEvent.keyDown(window, { key: 'Enter' })

    expect(result.current.view.currentSheet).toBe(1)
    expect(result.current.view.navigationTransition).toBeNull()
  })

  test('does not replace Enter behavior on interactive controls', () => {
    const { result } = renderBook()
    const button = document.createElement('button')
    document.body.appendChild(button)

    fireEvent.keyDown(button, { key: 'Enter' })

    expect(result.current.view.navigationTransition).toBeNull()
    button.remove()
  })

  test('focuses the first list item as soon as navigation finishes', () => {
    const { result } = renderBook()
    const list = document.createElement('ul')
    const firstItem = document.createElement('button')
    list.dataset.bookNavigationSheet = '2'
    list.appendChild(firstItem)
    document.body.appendChild(list)

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    act(() => jest.advanceTimersByTime(700))
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(result.current.view.currentSheet).toBe(2)

    act(() => jest.advanceTimersByTime(700))
    expect(document.activeElement).toBe(firstItem)
    list.remove()
  })

  test('focuses the index before a long transition finishes', () => {
    renderBook()
    const list = document.createElement('ul')
    const firstItem = document.createElement('button')
    list.dataset.bookNavigationSheet = '2'
    list.appendChild(firstItem)
    document.body.appendChild(list)

    fireEvent.keyDown(window, { key: 'Enter' })

    expect(document.activeElement).toBe(firstItem)
    list.remove()
  })
})
