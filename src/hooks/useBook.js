import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  BOOK_DIRECTION,
  BOOK_SHEET,
  clamp,
  createSheetStyles,
  createVirtualNavigationStyles,
  getBookTransform,
} from '../utils/book';
import {
  clearBookNavigationFocus,
  clearBookPageNavigationFocus,
  focusFirstBookPageNavigationItem,
  focusFirstBookListItem,
  isBookPageNavigationFocused,
  moveBookPageNavigationFocus,
  moveBookListFocus,
} from '../utils/keyboardNavigation';

const TURN_FALLBACK_DURATION = 700;
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [contenteditable="true"]';
const EDITABLE_SELECTOR = 'input, select, textarea, [contenteditable="true"]';

const matchesTarget = ({ target, selector }) =>
  target instanceof window.Element && Boolean(target.closest(selector));

const useBook = ({ totalSheetCount, isNarrowViewport }) => {
  // Book position: 0 is closed; each increment means one more sheet has turned.
  const [currentSheet, setCurrentSheet] = useState(0);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [navigationTransition, setNavigationTransition] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const timers = useRef([]);
  const animationFrames = useRef([]);
  const lock = useRef(false);
  const activeSheet = useRef(0);
  const transitionState = useRef(null);

  const clearScheduledWork = useCallback(() => {
    timers.current.forEach(clearTimeout);
    animationFrames.current.forEach(window.cancelAnimationFrame);
    timers.current = [];
    animationFrames.current = [];
  }, []);

  useEffect(() => clearScheduledWork, [clearScheduledWork]);

  useEffect(() => {
    clearScheduledWork();
    lock.current = false;
    activeSheet.current = 0;
    transitionState.current = null;
    setIsLocked(false);
    setNavigationTransition(null);
    setCurrentSheet(0);
    setActiveSheetIndex(0);
  }, [totalSheetCount, clearScheduledWork]);

  const releaseLock = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    lock.current = false;
    setIsLocked(false);
  }, []);

  const completeTurn = useCallback(() => {
    if (!lock.current) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    const transition = transitionState.current;
    if (!transition) {
      releaseLock();
      return;
    }

    if (transition.isSettling) return;

    const settlingTransition = {
      ...transition,
      isSettling: true,
      isTurning: true,
    };

    transitionState.current = settlingTransition;
    setCurrentSheet(transition.targetSheet);
    setNavigationTransition(settlingTransition);

    const settleFrame = window.requestAnimationFrame(() => {
      const swapFrame = window.requestAnimationFrame(() => {
        transitionState.current = null;
        setNavigationTransition(null);

        const resetFrame = window.requestAnimationFrame(() => {
          releaseLock();
          animationFrames.current = [];
        });

        animationFrames.current.push(resetFrame);
      });

      animationFrames.current.push(swapFrame);
    });

    animationFrames.current.push(settleFrame);
  }, [releaseLock]);

  const scheduleFallback = useCallback(() => {
    const fallbackTimer = setTimeout(completeTurn, TURN_FALLBACK_DURATION);
    timers.current.push(fallbackTimer);
  }, [completeTurn]);

  const goTo = useCallback(
    (destinationSheet) => {
      if (lock.current) return;

      const targetSheet = clamp({
        value: destinationSheet,
        minimum: 0,
        maximum: totalSheetCount,
      });
      if (targetSheet === currentSheet) return;

      clearBookNavigationFocus();
      lock.current = true;
      setIsLocked(true);

      const direction =
        targetSheet > currentSheet ? BOOK_DIRECTION.forward : BOOK_DIRECTION.backward;
      const isAdjacentSheet = Math.abs(targetSheet - currentSheet) === 1;
      const isMovingForward = direction === BOOK_DIRECTION.forward;
      const nextActiveSheetIndex = isMovingForward ? targetSheet - 1 : targetSheet;
      activeSheet.current = nextActiveSheetIndex;
      setActiveSheetIndex(nextActiveSheetIndex);

      if (!isAdjacentSheet) {
        const transition = {
          currentSheet,
          direction,
          isTurning: false,
          targetSheet,
          turningSheetIndex: isMovingForward ? currentSheet : currentSheet - 1,
        };

        transitionState.current = transition;
        setNavigationTransition(transition);

        const firstFrame = window.requestAnimationFrame(() => {
          const secondFrame = window.requestAnimationFrame(() => {
            setNavigationTransition({ ...transition, isTurning: true });
            transitionState.current = { ...transition, isTurning: true };
            animationFrames.current = [];
            scheduleFallback();
          });

          animationFrames.current.push(secondFrame);
        });

        animationFrames.current.push(firstFrame);
        return;
      }

      setCurrentSheet(targetSheet);
      scheduleFallback();
    },
    [currentSheet, scheduleFallback, totalSheetCount],
  );

  const handleSheetTransitionEnd = useCallback(
    ({ event, sheetIndex }) => {
      const isSheetTransform =
        event.target === event.currentTarget && event.propertyName === 'transform';

      if (isSheetTransform && sheetIndex === activeSheet.current) completeTurn();
    },
    [completeTurn],
  );

  useLayoutEffect(() => {
    const focusSheet = navigationTransition?.targetSheet ?? currentSheet;

    focusFirstBookListItem({
      currentSheet: focusSheet,
      preferLastList: navigationTransition?.direction === BOOK_DIRECTION.backward,
    });
  }, [currentSheet, navigationTransition]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.defaultPrevented || event.repeat) return;
      if (matchesTarget({ target: event.target, selector: EDITABLE_SELECTOR })) return;

      if (event.key === 'ArrowDown') {
        const didMoveListFocus = !lock.current && moveBookListFocus({ currentSheet, direction: 1 });
        const didFocusPageNavigation =
          !didMoveListFocus && !lock.current && focusFirstBookPageNavigationItem({ currentSheet });

        if (didFocusPageNavigation || didMoveListFocus) event.preventDefault();
        return;
      }

      if (event.key === 'ArrowUp') {
        const didLeavePageNavigation = clearBookPageNavigationFocus();
        if (didLeavePageNavigation) {
          event.preventDefault();
          return;
        }

        const didMoveFocus =
          !lock.current &&
          moveBookListFocus({
            currentSheet,
            direction: -1,
          });

        if (didMoveFocus) event.preventDefault();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (isBookPageNavigationFocused()) {
          moveBookPageNavigationFocus({
            currentSheet,
            direction: 1,
          });
        } else {
          goTo(currentSheet + 1);
        }
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (isBookPageNavigationFocused()) {
          moveBookPageNavigationFocus({
            currentSheet,
            direction: -1,
          });
        } else {
          goTo(currentSheet - 1);
        }
        return;
      }

      const shouldOpenClosedBook =
        event.key === 'Enter' &&
        currentSheet === 0 &&
        !matchesTarget({ target: event.target, selector: INTERACTIVE_SELECTOR });

      if (shouldOpenClosedBook) {
        event.preventDefault();
        goTo(BOOK_SHEET.index);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSheet, goTo]);

  const actions = useMemo(
    () => ({
      turnForward: (sheetIndex) => goTo(sheetIndex + 1),
      turnBackward: (sheetIndex) => goTo(sheetIndex),
      goTo,
      handleSheetTransitionEnd,
      toggleIndex: (isMobileNav) => {
        if (isMobileNav && currentSheet > 0) goTo(0);
        else goTo(BOOK_SHEET.index);
      },
    }),
    [currentSheet, goTo, handleSheetTransitionEnd],
  );

  const view = useMemo(
    () => ({
      currentSheet,
      isLocked,
      isOpen: currentSheet > 0,
      pointerEvents: isLocked ? 'none' : 'all',
      transform: getBookTransform({
        isNarrowViewport,
        currentSheet: navigationTransition?.isTurning
          ? navigationTransition.targetSheet
          : currentSheet,
        totalSheetCount,
      }),
      navigationTransition,
      sheetStyles: navigationTransition
        ? createVirtualNavigationStyles({
            ...navigationTransition,
            totalSheetCount,
          })
        : createSheetStyles({
            totalSheetCount,
            currentSheet,
            activeSheetIndex,
          }),
    }),
    [
      activeSheetIndex,
      currentSheet,
      isLocked,
      isNarrowViewport,
      navigationTransition,
      totalSheetCount,
    ],
  );

  return { actions, view };
};

export default useBook;
