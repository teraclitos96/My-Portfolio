import BookBiography from './book-front-pages/BookBiography'
import BookCover from './book-front-pages/BookCover'
import BookInnerCover from './book-front-pages/BookInnerCover'
import BookNavigationPage from './book-front-pages/BookNavigationPage'
import BookProjectDescription from './book-front-pages/BookProjectDescription'
import { BOOK_PAGE_TYPE } from '../../utils/book'

const renderPageContent = ({ page, sheetIndex, content, language, book }) => {
  switch (page.type) {
    case BOOK_PAGE_TYPE.innerCover:
      return <BookInnerCover page={page} />
    case BOOK_PAGE_TYPE.index:
    case BOOK_PAGE_TYPE.projects:
      return (
        <BookNavigationPage
          page={page}
          sheetIndex={sheetIndex}
          content={content}
          handleNavigate={book.actions.goTo}
        />
      )
    case BOOK_PAGE_TYPE.biography:
      return <BookBiography page={page} />
    case BOOK_PAGE_TYPE.projectDetails:
      return <BookProjectDescription page={page} language={language} />
    default:
      return null
  }
}

const FrontSheet = ({ sheetIndex, page, content, language, book }) => {
  const isCover = page.type === BOOK_PAGE_TYPE.cover

  return (
    <div
      onClick={() => book.actions.turnForward(sheetIndex)}
      className={isCover ? 'face-front portada' : 'face-front'}
      style={{ pointerEvents: book.view.pointerEvents }}
    >
      {isCover
        ? <BookCover page={page} />
        : (
          <div className={`front-sheet-content front-sheet-content--${page.type}`}>
            {renderPageContent({
              page,
              sheetIndex,
              content,
              language,
              book
            })}
          </div>
          )}
    </div>
  )
}

export default FrontSheet
