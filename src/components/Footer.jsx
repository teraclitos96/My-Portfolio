import SocialLinks from './SocialLinks'
import { useTranslation } from 'react-i18next'
import '../styles/all.css'

const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <footer className='py-2 px-lg-5 d-flex flex-column flex-lg-row justify-content-between align-items-center red  '>
      <a href='/' className='mb-4 mb-lg-0 '>
        <img
          className='logo-footer'
          src='https://res.cloudinary.com/duuwqmpmn/image/upload/v1685995702/logo-main-page_groqjz.png'
          alt={t('footer.logoAlt')}
        />
      </a>
      <SocialLinks />
    </footer>
  )
}

export default Footer
