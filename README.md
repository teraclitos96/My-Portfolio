# Francisco Teran — Portfolio

Interactive developer portfolio presented as an animated book. It includes bilingual content, responsive layouts, project case studies and downloadable CVs while preserving the visual identity of a printed book.

## Features

- English and Spanish content.
- Animated page turns with direct navigation for distant pages.
- Responsive book and navigation for desktop and mobile.
- Reusable project presentation, actions and page-navigation components.
- Project technology icons with accessible tooltips.
- Downloadable CV according to the selected language.
- Mouse, touch and keyboard navigation.

## Keyboard navigation

- `ArrowLeft` / `ArrowRight`: turn one page.
- `Enter`: open a closed book directly at the index.
- Index and project lists autofocus their first item; use `ArrowUp` / `ArrowDown` to move and `Enter` to navigate.
- On project pages, `ArrowDown` focuses the lower navigation, `ArrowLeft` / `ArrowRight` switch between its links, and `ArrowUp` clears the focus.

## Architecture

The application uses native React hooks and separates responsibilities by module:

- `pages`: route-level composition.
- `components`: reusable UI and book sheets.
- `hooks`: book state, transitions, keyboard behavior and media queries.
- `data`: bilingual portfolio and project content.
- `utils`: page stacking, breakpoints, links and focus navigation.
- `styles`: global, book, navigation and responsive styles.

No Redux or external state-management library is used.

## Technologies

React, React Router, React Bootstrap, Font Awesome, React Icons and React Tooltip.

## Local development

```bash
npm install
npm start
```

The application runs at [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm test -- --watchAll=false --runInBand
npm run build
```

## Live site

[franciscoteran.com](https://franciscoteran.com/)
