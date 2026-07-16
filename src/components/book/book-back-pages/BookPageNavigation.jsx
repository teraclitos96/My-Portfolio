import { BOOK_SHEET } from '../../../utils/book'

const labelsByLanguage = {
  english: {
    navigation: 'Book page navigation',
    index: '← Index',
    indexAriaLabel: 'Back to index',
    projects: 'All projects',
    projectsAriaLabel: 'View all projects'
  },
  spanish: {
    navigation: 'Navegación del libro',
    index: '← Índice',
    indexAriaLabel: 'Volver al índice',
    projects: 'Todos los proyectos',
    projectsAriaLabel: 'Ver todos los proyectos'
  }
}

const BookPageNavigation = ({
  language,
  handleNavigate,
  sheetIndex,
  showProjects = false
}) => {
  const labels = labelsByLanguage[language]

  const navigateTo = ({ event, destinationSheet }) => {
    event.stopPropagation()
    handleNavigate(destinationSheet)
  }

  return (
    <nav
      className='book-page-navigation'
      aria-label={labels.navigation}
      data-book-sheet-navigation={sheetIndex}
    >
      <button
        type='button'
        className='book-page-navigation-link letter-title-book no-button-styles'
        aria-label={labels.indexAriaLabel}
        onClick={event => navigateTo({ event, destinationSheet: BOOK_SHEET.index })}
      >
        {labels.index}
      </button>
      {showProjects && (
        <button
          type='button'
          className='book-page-navigation-link letter-title-book no-button-styles'
          aria-label={labels.projectsAriaLabel}
          onClick={event => navigateTo({ event, destinationSheet: BOOK_SHEET.projects })}
        >
          {labels.projects}
        </button>
      )}
    </nav>
  )
}

export default BookPageNavigation
