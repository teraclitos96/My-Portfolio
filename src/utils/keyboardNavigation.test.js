import {
  clearBookNavigationFocus,
  clearBookPageNavigationFocus,
  focusFirstBookPageNavigationItem,
  focusFirstBookListItem,
  moveBookPageNavigationFocus,
  moveBookListFocus,
} from './keyboardNavigation';

describe('book list keyboard navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-book-navigation-sheet="2">
        <li><button>First</button></li>
        <li><button>Second</button></li>
        <li><a href="#third">Third</a></li>
      </ul>
    `;
  });

  test('focuses and cycles forward through list items', () => {
    const items = document.querySelectorAll('button, a');

    expect(moveBookListFocus({ currentSheet: 2, direction: 1 })).toBe(true);
    expect(document.activeElement).toBe(items[0]);

    moveBookListFocus({ currentSheet: 2, direction: 1 });
    moveBookListFocus({ currentSheet: 2, direction: 1 });
    moveBookListFocus({ currentSheet: 2, direction: 1 });
    expect(document.activeElement).toBe(items[0]);
  });

  test('focuses the first item when entering a navigation page', () => {
    const firstItem = document.querySelector('button');

    expect(focusFirstBookListItem({ currentSheet: 2 })).toBe(true);
    expect(document.activeElement).toBe(firstItem);
  });

  test('starts at the last item and cycles backward', () => {
    const items = document.querySelectorAll('button, a');

    expect(moveBookListFocus({ currentSheet: 2, direction: -1 })).toBe(true);
    expect(document.activeElement).toBe(items[2]);

    moveBookListFocus({ currentSheet: 2, direction: -1 });
    expect(document.activeElement).toBe(items[1]);
  });

  test('does nothing outside a navigation page', () => {
    expect(moveBookListFocus({ currentSheet: 5, direction: 1 })).toBe(false);
  });

  test('clears focus after navigating from a book list', () => {
    const button = document.querySelector('button');
    button.focus();

    clearBookNavigationFocus();

    expect(document.activeElement).toBe(document.body);
  });

  test('enters, moves through and leaves page navigation', () => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `
      <nav data-book-sheet-navigation="4">
        <button>Index</button>
        <button>All projects</button>
      </nav>
    `,
    );
    const items = document.querySelectorAll('[data-book-sheet-navigation] button');

    expect(focusFirstBookPageNavigationItem({ currentSheet: 5 })).toBe(true);
    expect(document.activeElement).toBe(items[0]);

    moveBookPageNavigationFocus({ currentSheet: 5, direction: 1 });
    expect(document.activeElement).toBe(items[1]);

    expect(clearBookPageNavigationFocus()).toBe(true);
    expect(document.activeElement).toBe(document.body);
  });
});
