import BookAboutMe from './book-back-pages/BookAboutMe'
import BookPageNavigation from './book-back-pages/BookPageNavigation'
import BookProjectOverview from './book-back-pages/BookProjectOverview'
import { BOOK_PAGE_NAVIGATION, BOOK_PAGE_TYPE } from '../../utils/book'

const renderPageContent = ({ page, downloadCV }) => {
  switch (page.type) {
    case BOOK_PAGE_TYPE.about:
      return <BookAboutMe page={page} downloadCV={downloadCV} />
    case BOOK_PAGE_TYPE.projectOverview:
      return <BookProjectOverview page={page} />
    default:
      return null
  }
}

const BackSheet = ({ sheetIndex, page, language, downloadCV, book }) => {
  const isBackCover = page.type === BOOK_PAGE_TYPE.backCover

  return (
    <div
      onClick={() => book.actions.turnBackward(sheetIndex)}
      className={isBackCover ? 'face-back portada-back' : 'face-back'}
      style={{ pointerEvents: book.view.pointerEvents }}
    >
      <div className='back-sheet-content pt-3'>
        {renderPageContent({ page, downloadCV })}
        {page.navigation && (
          <BookPageNavigation
            language={language}
            handleNavigate={book.actions.goTo}
            sheetIndex={sheetIndex}
            showProjects={page.navigation === BOOK_PAGE_NAVIGATION.projects}
          />
        )}
        {page.number != null && <span className='number-page'>{page.number}</span>}
      </div>
    </div>
  )
}

export default BackSheet
