import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import Book from '../components/book/Book'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import NavBar from '../components/NavBar'
import Technologies from '../components/Technologies'
import { createPortfolioContent } from '../data/Data'
import useBook from '../hooks/useBook'
import useMediaQuery from '../hooks/useMediaQuery'
import { MEDIA_QUERIES } from '../utils/breakpoints'
import '../styles/all.css'

const PortfolioPage = () => {
  const { t, i18n } = useTranslation(['common', 'book', 'projects'])
  const language = i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en'
  const title = language === 'es'
    ? 'Francisco Terán — Desarrollador Full-Stack | React y Node.js'
    : 'Francisco Terán — Full-Stack Developer | React & Node.js'
  const content = createPortfolioContent({ t })
  const isCompactNavigation = useMediaQuery(MEDIA_QUERIES.compactNavigation)
  const isNarrowBook = useMediaQuery(MEDIA_QUERIES.narrowBook)
  const book = useBook({
    totalSheetCount: content.sheets.length,
    isNarrowViewport: isNarrowBook
  })
  const handleTechnologyNavigate = book.actions.goTo

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <html lang={language} />
      </Helmet>
      <Loader />
      <Container fluid className='min-vh-100 page-main-container pb-5 px-0'>
        <NavBar
          isCompact={isCompactNavigation}
          book={book}
        />
        <Container className='py-3'>
          <main className='min-vh-100'>
            <Technologies
              navigation={content.technologyNavigation}
              onNavigate={handleTechnologyNavigate}
            />
            <div className='d-flex justify-content-center align-items-center'>
              <Book content={content} book={book} />
            </div>
          </main>
        </Container>
        <Footer />
      </Container>
    </>
  )
}

export default PortfolioPage
