import SocialLinks from './SocialLinks'
import { useTranslation } from 'react-i18next'
import { getPagePath } from '../utils/seo'
import { optimizeImage } from '../utils/images'
import '../styles/all.css'

const Footer = () => {
  const { t, i18n } = useTranslation('common')

  return (
    <footer className='py-2 px-lg-5 d-flex flex-column flex-lg-row justify-content-between align-items-center red  '>
      <a
        href={getPagePath(i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en')}
        className='mb-4 mb-lg-0 '
      >
        <img
          className='logo-footer'
          src={optimizeImage(
            'https://res.cloudinary.com/duuwqmpmn/image/upload/v1685995702/logo-main-page_groqjz.png',
            320
          )}
          width='265'
          height='301'
          loading='lazy'
          decoding='async'
          alt={t('footer.logoAlt')}
        />
      </a>
      <SocialLinks />
    </footer>
  )
}

export default Footer
