# Francisco Teran — Portfolio

Interactive developer portfolio presented as an animated book. It combines bilingual project case studies, responsive layouts, keyboard navigation and downloadable CVs while preserving the visual identity of a printed book.

## Features

- English and Spanish content powered by `react-i18next`.
- Animated single-sheet turns and direct navigation to distant sheets.
- Responsive book and navigation for desktop and mobile.
- Reusable project overviews, details, actions, technology lists and page navigation.
- Project technology icons with accessible tooltips.
- Downloadable CV according to the selected language.
- Mouse, touch and keyboard navigation.

## Keyboard navigation

- `ArrowLeft` / `ArrowRight`: turn one sheet backward or forward.
- With no item focused, `Enter` opens a closed book at the index or returns an open book to the index from another sheet.
- On the index and project lists, the first item receives focus automatically. Use `ArrowUp` / `ArrowDown` to move and `Enter` to navigate.
- On project sheets, `ArrowDown` focuses the lower navigation, `ArrowLeft` / `ArrowRight` move between its links, `Enter` follows the selected link and `ArrowUp` clears focus.

## Architecture

The application uses native React hooks and separates responsibilities by module:

- `pages`: route-level composition.
- `components`: reusable interface elements.
- `components/book`: the book view and its domain-specific modules.
  - `sheets`: the physical `FrontFace` and `BackFace` of a sheet.
  - `views`: content rendered on each face, such as covers, biography and project views.
  - `navigation`: index, project-list and lower page navigation.
  - `project`: shared project actions and technology presentation.
- `hooks`: book state, transitions, keyboard behavior and media queries.
- `data`: language-independent portfolio structure, project links, images and technologies.
- `i18n`: `i18next` configuration and English/Spanish translation resources.
- `utils`: sheet stacking, breakpoints, links and focus navigation.
- `styles`: global, book, navigation and responsive styles.

No Redux or external state-management library is used. UI state is handled with native React hooks, while `react-i18next` manages translated content.

## Technologies

React, React Router, React Bootstrap, React Helmet, i18next, react-i18next, Font Awesome, React Icons and React Tooltip.

## Local development

```bash
npm install
npm start
```

The application runs at [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm test -- --watchAll=false --runInBand --forceExit
npm run build
```

## Live site

[franciscoteran.vercel.app](https://franciscoteran.vercel.app/)
