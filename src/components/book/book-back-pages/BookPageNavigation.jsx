import { BOOK_PAGE } from '../../../utils/book'

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
  pageIndex,
  showProjects = false
}) => {
  const labels = labelsByLanguage[language]

  const navigateTo = ({ event, destinationPage }) => {
    event.stopPropagation()
    handleNavigate(destinationPage)
  }

  return (
    <nav
      className='book-page-navigation'
      aria-label={labels.navigation}
      data-book-page-navigation={pageIndex}
    >
      <button
        type='button'
        className='book-page-navigation-link letter-title-book no-button-styles'
        aria-label={labels.indexAriaLabel}
        onClick={event => navigateTo({ event, destinationPage: BOOK_PAGE.index })}
      >
        {labels.index}
      </button>
      {showProjects && (
        <button
          type='button'
          className='book-page-navigation-link letter-title-book no-button-styles'
          aria-label={labels.projectsAriaLabel}
          onClick={event => navigateTo({ event, destinationPage: BOOK_PAGE.projects })}
        >
          {labels.projects}
        </button>
      )}
    </nav>
  )
}

export default BookPageNavigation
