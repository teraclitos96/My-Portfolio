import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getPagePath } from '../utils/seo'
import { optimizeImage } from '../utils/images'
import '../styles/all.css'

const NotFoundPage = () => {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en'

  return (
    <>
      <Helmet>
        <title>Francisco Terán | Error 404</title>
        <meta name='robots' content='noindex, follow' />
        <html lang={language} />
      </Helmet>
      <main className='error-404-container'>
        <img
          src={optimizeImage(
            'https://res.cloudinary.com/duuwqmpmn/image/upload/v1686004427/logo-error-404_vnksdy.png',
            640
          )}
          alt='Página no encontrada'
          className='logo-404'
        />
        <Link
          to={getPagePath(language)}
          className='letter-title-book dark-brown back-main link-404'
        >
          {language === 'es' ? 'Volver al inicio' : 'Back to main page'}
        </Link>
      </main>
    </>
  )
}

export default NotFoundPage
