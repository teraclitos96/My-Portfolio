import FrontSheet from './FrontSheet'
import BackSheet from './BackSheet'
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

  if (transition.direction > 0) {
    const destinationIndex = transition.targetPage - 1

    return {
      backIndex: destinationIndex,
      backPage: content.pages[destinationIndex].backPage,
      frontIndex: index,
      frontPage: sheet.frontPage
    }
  }

  const destinationIndex = transition.targetPage

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
              index={sheetContent.frontIndex}
              page={sheetContent.frontPage}
              content={content}
              language={language}
              book={book}
            />
            <BackSheet
              index={sheetContent.backIndex}
              page={sheetContent.backPage}
              sheetCount={content.pages.length}
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
