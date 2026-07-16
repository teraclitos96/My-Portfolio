import BookAboutMe from './book-back-pages/BookAboutMe'
import BookPageNavigation from './book-back-pages/BookPageNavigation'
import BookProjectOverview from './book-back-pages/BookProjectOverview'

const BackSheet = ({ index, page, sheetCount, language, downloadCV, book }) => {
  const isProject = index > 3 && index < sheetCount - 1
  const hasIndexLink = index > 1 && index < sheetCount - 1

  return (
    <div
      onClick={() => book.actions.turnBackward(index)}
      className={index === sheetCount - 1 ? 'face-back portada-back' : 'face-back'}
      style={{ pointerEvents: book.view.pointerEvents }}
    >
      <div className='back-sheet-content pt-3'>
        {index === 2 && <BookAboutMe page={page} downloadCV={downloadCV} />}
        {isProject && <BookProjectOverview page={page} />}
        {hasIndexLink && (
          <BookPageNavigation
            language={language}
            handleNavigate={book.actions.goTo}
            pageIndex={index}
            showProjects={isProject}
          />
        )}
        <span className='number-page'>{page.number}</span>
      </div>
    </div>
  )
}

export default BackSheet
