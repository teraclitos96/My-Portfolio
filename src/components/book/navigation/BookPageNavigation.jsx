import { useTranslation } from 'react-i18next'
import { BOOK_SHEET } from '../../../utils/book'

const BookPageNavigation = ({
  handleNavigate,
  sheetIndex,
  showProjects = false
}) => {
  const { t } = useTranslation('book')

  const navigateTo = ({ event, destinationSheet }) => {
    event.stopPropagation()
    handleNavigate(destinationSheet)
  }

  return (
    <nav
      className='book-page-navigation'
      aria-label={t('navigation.label')}
      data-book-sheet-navigation={sheetIndex}
    >
      <button
        type='button'
        className='book-page-navigation-link letter-title-book no-button-styles'
        aria-label={t('navigation.indexAriaLabel')}
        onClick={event => navigateTo({ event, destinationSheet: BOOK_SHEET.index })}
      >
        {t('navigation.index')}
      </button>
      {showProjects && (
        <button
          type='button'
          className='book-page-navigation-link letter-title-book no-button-styles'
          aria-label={t('navigation.projectsAriaLabel')}
          onClick={event => navigateTo({ event, destinationSheet: BOOK_SHEET.projects })}
        >
          {t('navigation.projects')}
        </button>
      )}
    </nav>
  )
}

export default BookPageNavigation
