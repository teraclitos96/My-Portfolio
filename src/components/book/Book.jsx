import FrontFace from './sheets/FrontFace'
import BackFace from './sheets/BackFace'
import { BOOK_DIRECTION } from '../../utils/book'
import { useTranslation } from 'react-i18next'
import '../../styles/all.css'

const getSheetContent = ({ content, sheetIndex, transition }) => {
  const sheet = content.sheets[sheetIndex]

  if (!transition || sheetIndex !== transition.turningSheetIndex) {
    return {
      backSheetIndex: sheetIndex,
      backPage: sheet.backPage,
      frontSheetIndex: sheetIndex,
      frontPage: sheet.frontPage
    }
  }

  if (transition.direction === BOOK_DIRECTION.forward) {
    const destinationIndex = transition.targetSheet - 1

    return {
      backSheetIndex: destinationIndex,
      backPage: content.sheets[destinationIndex].backPage,
      frontSheetIndex: sheetIndex,
      frontPage: sheet.frontPage
    }
  }

  const destinationIndex = transition.targetSheet

  return {
    backSheetIndex: sheetIndex,
    backPage: sheet.backPage,
    frontSheetIndex: destinationIndex,
    frontPage: content.sheets[destinationIndex].frontPage
  }
}

const Book = ({ content, book }) => {
  const { t } = useTranslation('common')
  const downloadCV = () => window.open(`${process.env.PUBLIC_URL}${content.cvFile}`)

  return (
    <section
      aria-label={t('portfolio.bookAria')}
      style={{ transform: book.view.transform }}
      className='book-content'
    >
      {content.sheets.map((sheet, sheetIndex) => {
        const sheetContent = getSheetContent({
          content,
          sheetIndex,
          transition: book.view.navigationTransition
        })

        return (
          <article
            key={sheet.id}
            style={book.view.sheetStyles[sheetIndex]}
            className='book'
            onTransitionEnd={event => book.actions.handleSheetTransitionEnd({
              event,
              sheetIndex
            })}
          >
            <FrontFace
              sheetIndex={sheetContent.frontSheetIndex}
              page={sheetContent.frontPage}
              content={content}
              book={book}
            />
            <BackFace
              sheetIndex={sheetContent.backSheetIndex}
              page={sheetContent.backPage}
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
