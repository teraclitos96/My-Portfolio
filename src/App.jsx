import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import PortfolioPage from './pages/PortfolioPage'
import NotFoundPage from './pages/NotFoundPage'
import { projectDefinitions } from './data/projects'
import { LANGUAGES } from './utils/seo'

const LocalizedPortfolio = () => {
  const { language, projectId } = useParams()
  if (
    !LANGUAGES.includes(language) ||
    (projectId && !projectDefinitions.some((project) => project.id === projectId))
  ) {
    return <NotFoundPage />
  }

  return (
    <PortfolioPage
      key={`${language}/${projectId || ''}`}
      language={language}
      projectId={projectId}
    />
  )
}

export const PortfolioRoutes = () => (
  <Routes>
    <Route path='/' element={<PortfolioPage language='en' />} />
    <Route path='/:language' element={<LocalizedPortfolio />} />
    <Route path='/:language/projects/:projectId' element={<LocalizedPortfolio />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
)

function App() {
  return (
    <BrowserRouter>
      <PortfolioRoutes />
    </BrowserRouter>
  )
}

export default App
