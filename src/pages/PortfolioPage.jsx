import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import Book from '../components/book/Book'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import NavBar from '../components/NavBar'
import Technologies from '../components/Technologies'
import { createPortfolioContent } from '../data/Data'
import useBook from '../hooks/useBook'
import useMediaQuery from '../hooks/useMediaQuery'
import { MEDIA_QUERIES } from '../utils/breakpoints'
import { createProjects } from '../data/projects'
import { BOOK_SHEET } from '../utils/book'
import '../styles/all.css'

const PortfolioPage = ({ language, projectId }) => {
  const { t } = useTranslation(['common', 'book', 'projects'], { lng: language })
  const projects = createProjects({ t })
  const projectIndex = projects.findIndex((project) => project.id === projectId)
  const project = projects[projectIndex]
  const content = createPortfolioContent({ t })
  const isCompactNavigation = useMediaQuery(MEDIA_QUERIES.compactNavigation)
  const isNarrowBook = useMediaQuery(MEDIA_QUERIES.narrowBook)
  const book = useBook({
    totalSheetCount: content.sheets.length,
    initialSheet: projectIndex < 0 ? 0 : projectIndex + BOOK_SHEET.firstProject,
    isNarrowViewport: isNarrowBook
  })
  const handleTechnologyNavigate = book.actions.goTo

  return (
    <>
      <Seo language={language} project={project} />
      <Container fluid className='min-vh-100 page-main-container pb-5 px-0'>
        <NavBar isCompact={isCompactNavigation} book={book} project={project} />
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
