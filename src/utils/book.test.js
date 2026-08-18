import {
  BOOK_DIRECTION,
  clamp,
  createSheetStyles,
  createVirtualNavigationStyles,
  getBookTransform,
} from './book';

describe('book helpers', () => {
  test('clamps destinations to the book boundaries', () => {
    expect(clamp({ value: -1, minimum: 0, maximum: 12 })).toBe(0);
    expect(clamp({ value: 13, minimum: 0, maximum: 12 })).toBe(12);
  });

  test('creates stacking and rotation styles from one page count', () => {
    expect(
      createSheetStyles({
        totalSheetCount: 3,
        currentSheet: 1,
        activeSheetIndex: 0,
      }),
    ).toEqual([
      { zIndex: 4, transform: 'rotateY(-180deg)' },
      { zIndex: 2, transform: 'rotateY(0deg)' },
      { zIndex: 1, transform: 'rotateY(0deg)' },
    ]);
  });

  test('keeps the turning sheet above adjacent and background sheets', () => {
    const styles = createSheetStyles({
      totalSheetCount: 12,
      currentSheet: 5,
      activeSheetIndex: 4,
    });

    expect(styles[4].zIndex).toBe(13);
    expect(styles[3].zIndex).toBe(4);
    expect(styles[5].zIndex).toBe(7);
    expect(styles[2].zIndex).toBe(3);
  });

  test('keeps only the origin sheet and distant destination above intermediate sheets', () => {
    const styles = createVirtualNavigationStyles({
      currentSheet: 4,
      direction: BOOK_DIRECTION.forward,
      isSettling: false,
      isTurning: true,
      targetSheet: 7,
      totalSheetCount: 9,
      turningSheetIndex: 4,
    });

    expect(styles[4]).toEqual({ zIndex: 10, transform: 'rotateY(-180deg)' });
    expect(styles[7]).toEqual({ zIndex: 9, transform: 'rotateY(0deg)' });
    expect(styles[5]).toEqual({ zIndex: 4, transform: 'rotateY(0deg)' });
    expect(styles[6]).toEqual({ zIndex: 3, transform: 'rotateY(0deg)' });
  });

  test('keeps a distant backward destination above intermediate sheets', () => {
    const styles = createVirtualNavigationStyles({
      currentSheet: 7,
      direction: BOOK_DIRECTION.backward,
      isSettling: false,
      isTurning: true,
      targetSheet: 3,
      totalSheetCount: 9,
      turningSheetIndex: 6,
    });

    expect(styles[6]).toEqual({ zIndex: 10, transform: 'rotateY(0deg)' });
    expect(styles[2]).toEqual({ zIndex: 9, transform: 'rotateY(-180deg)' });
    expect(styles[3].zIndex).toBeLessThan(styles[2].zIndex);
    expect(styles[4].zIndex).toBeLessThan(styles[2].zIndex);
    expect(styles[5].zIndex).toBeLessThan(styles[2].zIndex);
  });

  test('removes intermediate sheets from the left side while closing', () => {
    const styles = createVirtualNavigationStyles({
      currentSheet: 7,
      direction: BOOK_DIRECTION.backward,
      isSettling: false,
      isTurning: false,
      targetSheet: 0,
      totalSheetCount: 9,
      turningSheetIndex: 6,
    });

    expect(styles[6]).toEqual({ zIndex: 10, transform: 'rotateY(-180deg)' });
    expect(styles[0]).toEqual({
      zIndex: 9,
      transform: 'rotateY(0deg)',
      visibility: 'hidden',
      transition: 'none',
    });
    expect(styles[5]).toEqual({
      zIndex: 4,
      transform: 'rotateY(0deg)',
      transition: 'none',
    });
  });

  test('normalizes hidden sheets while keeping the virtual sheet visible', () => {
    const styles = createVirtualNavigationStyles({
      currentSheet: 4,
      direction: BOOK_DIRECTION.forward,
      isSettling: true,
      isTurning: true,
      targetSheet: 7,
      totalSheetCount: 9,
      turningSheetIndex: 4,
    });

    expect(styles[4]).toEqual({ zIndex: 10, transform: 'rotateY(-180deg)' });
    expect(styles[5].transform).toBe('rotateY(-180deg)');
    expect(styles[5].transition).toBe('none');
    expect(styles[6].transform).toBe('rotateY(-180deg)');
    expect(styles[6].transition).toBe('none');
    expect(styles[7].transform).toBe('rotateY(0deg)');
    expect(styles[7].transition).toBeUndefined();
  });

  test('centers an open desktop book', () => {
    expect(
      getBookTransform({
        isNarrowViewport: false,
        currentSheet: 2,
        totalSheetCount: 12,
      }),
    ).toBe('translateX(50%)');
  });

  test('positions an open book within a narrow viewport', () => {
    expect(
      getBookTransform({
        isNarrowViewport: true,
        currentSheet: 2,
        totalSheetCount: 12,
      }),
    ).toBe('translateX(calc(47vw - 50%))');
  });
});
