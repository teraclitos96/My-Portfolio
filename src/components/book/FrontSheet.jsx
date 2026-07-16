import BookCover from './book-front-pages/BookCover'
import BookIndex from './book-front-pages/BookIndex'
import BookInnerCover from './book-front-pages/BookInnerCover'
import BookProjectDescription from './book-front-pages/BookProjectDescription'
import BookProjectsList from './book-front-pages/BookProjectsList'
import { BOOK_PAGE } from '../../utils/book'

const FrontSheet = ({ index, page, content, language, book }) => {
  const isNavigationPage = index === BOOK_PAGE.index || index === BOOK_PAGE.projects
  const handleTurn = () => book.actions.turnForward(index)

  return (
    <div
      onClick={handleTurn}
      className={index === 0 ? 'face-front portada' : 'face-front'}
      style={{ pointerEvents: book.view.pointerEvents }}
    >
      {index === 0 && <BookCover page={page} />}
      <div className={`front-sheet-content ${index === 3 || index > 4 ? 'pt-0' : 'pt-3'}`}>
        {index === 1 && <BookInnerCover page={page} />}
        {isNavigationPage && (
          <div>
            <h2 className='letter-title-book title-size text-center mb-3'>
              {page.title}
            </h2>
            <ul
              className='book-navigation-list list-style-none p-0 d-flex flex-column'
              data-book-navigation-page={index}
            >
              {index === BOOK_PAGE.index && content.index.map((item, itemIndex) => (
                <BookIndex
                  key={item.id}
                  item={item}
                  index={itemIndex}
                  handleNavigate={book.actions.goTo}
                />
              ))}
              {index === BOOK_PAGE.projects && content.projects.map(project => (
                <BookProjectsList
                  key={project.id}
                  project={project}
                  handleNavigate={book.actions.goTo}
                />
              ))}
            </ul>
          </div>
        )}
        <BookProjectDescription page={page} language={language} />
      </div>
    </div>
  )
}

export default FrontSheet
