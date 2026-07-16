import { useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Book from '../components/book/Book'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import NavBar from '../components/NavBar'
import Technologies from '../components/Technologies'
import { portfolioContentByLanguage } from '../data/Data'
import useBook from '../hooks/useBook'
import useMediaQuery from '../hooks/useMediaQuery'
import { MEDIA_QUERIES } from '../utils/breakpoints'
import '../styles/all.css'

const PortfolioPage = () => {
  const [language, setLanguage] = useState('english')
  const content = useMemo(() => portfolioContentByLanguage[language], [language])
  const isCompactNavigation = useMediaQuery(MEDIA_QUERIES.compactNavigation)
  const isNarrowBook = useMediaQuery(MEDIA_QUERIES.narrowBook)
  const book = useBook({
    totalSheetCount: content.pages.length,
    isNarrowViewport: isNarrowBook
  })

  const toggleLanguage = () => {
    setLanguage(current => current === 'english' ? 'spanish' : 'english')
  }

  return (
    <>
      <Helmet>
        <title>Francisco Teran</title>
        <html lang={language === 'english' ? 'en' : 'es'} />
      </Helmet>
      <Loader />
      <Container fluid className='min-vh-100 page-main-container pb-5 px-0'>
        <NavBar
          language={language}
          onToggleLanguage={toggleLanguage}
          isCompact={isCompactNavigation}
          book={book}
        />
        <Container className='py-3'>
          <main className='min-vh-100'>
            <Technologies />
            <div className='d-flex justify-content-center align-items-center'>
              <Book content={content} language={language} book={book} />
            </div>
          </main>
        </Container>
        <Footer language={language} />
      </Container>
    </>
  )
}

export default PortfolioPage
