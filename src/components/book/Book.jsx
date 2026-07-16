import FrontSheet from './FrontSheet'
import BackSheet from './BackSheet'
import { BOOK_DIRECTION } from '../../utils/book'
import '../../styles/all.css'

const getSheetContent = ({ content, index, transition }) => {
  const sheet = content.pages[index]

  if (!transition || index !== transition.turningSheetIndex) {
    return {
      backIndex: index,
      backPage: sheet.backPage,
      frontIndex: index,
      frontPage: sheet.frontPage
    }
  }

  if (transition.direction === BOOK_DIRECTION.forward) {
    const destinationIndex = transition.targetSheet - 1

    return {
      backIndex: destinationIndex,
      backPage: content.pages[destinationIndex].backPage,
      frontIndex: index,
      frontPage: sheet.frontPage
    }
  }

  const destinationIndex = transition.targetSheet

  return {
    backIndex: index,
    backPage: sheet.backPage,
    frontIndex: destinationIndex,
    frontPage: content.pages[destinationIndex].frontPage
  }
}

const Book = ({ content, language, book }) => {
  const downloadCV = () => window.open(`${process.env.PUBLIC_URL}${content.cvFile}`)

  return (
    <section
      aria-label={language === 'spanish' ? 'Portfolio en forma de libro' : 'Book portfolio'}
      style={{ transform: book.view.transform }}
      className='book-content'
    >
      {content.pages.map((sheet, index) => {
        const sheetContent = getSheetContent({
          content,
          index,
          transition: book.view.navigationTransition
        })

        return (
          <article
            key={sheet.id}
            style={book.view.sheetStyles[index]}
            className='book'
            onTransitionEnd={event => book.actions.handleSheetTransitionEnd({
              event,
              sheetIndex: index
            })}
          >
            <FrontSheet
              sheetIndex={sheetContent.frontIndex}
              page={sheetContent.frontPage}
              content={content}
              language={language}
              book={book}
            />
            <BackSheet
              sheetIndex={sheetContent.backIndex}
              page={sheetContent.backPage}
              language={language}
              downloadCV={downloadCV}
              book={book}
            />
          </article>
        )
      })}
    </section>
  )
}

export default Book
