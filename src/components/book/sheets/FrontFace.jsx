import BiographyView from '../views/BiographyView'
import CoverView from '../views/CoverView'
import InnerCoverView from '../views/InnerCoverView'
import NavigationView from '../views/NavigationView'
import ProjectDetailsView from '../views/ProjectDetailsView'
import { BOOK_PAGE_TYPE } from '../../../utils/book'

const renderPageContent = ({ page, sheetIndex, content, book }) => {
  switch (page.type) {
    case BOOK_PAGE_TYPE.innerCover:
      return <InnerCoverView page={page} />
    case BOOK_PAGE_TYPE.index:
    case BOOK_PAGE_TYPE.projects:
      return (
        <NavigationView
          page={page}
          sheetIndex={sheetIndex}
          content={content}
          handleNavigate={book.actions.goTo}
        />
      )
    case BOOK_PAGE_TYPE.biography:
      return <BiographyView page={page} />
    case BOOK_PAGE_TYPE.projectDetails:
      return <ProjectDetailsView page={page} />
    default:
      return null
  }
}

const FrontFace = ({ sheetIndex, page, content, book }) => {
  const isCover = page.type === BOOK_PAGE_TYPE.cover

  return (
    <div
      onClick={() => book.actions.turnForward(sheetIndex)}
      className={isCover ? 'face-front portada' : 'face-front'}
      style={{ pointerEvents: book.view.pointerEvents }}
    >
      {isCover ? (
        <CoverView page={page} />
      ) : (
        <div className={`front-sheet-content front-sheet-content--${page.type}`}>
          {renderPageContent({
            page,
            sheetIndex,
            content,
            book
          })}
        </div>
      )}
    </div>
  )
}

export default FrontFace
