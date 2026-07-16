import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import WoodenButton from './WoodenButton'
import '../styles/all.css'

const NavBar = ({ isCompact, book }) => {
  const { t, i18n } = useTranslation('common')
  const language = i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en'
  const toggleIndex = () => book.actions.toggleIndex(isCompact)
  const toggleLanguage = () => i18n.changeLanguage(language === 'en' ? 'es' : 'en')

  return (
    <nav className='px-3 px-lg-5 d-flex justify-content-between align-items-center nav-bar'>
      <button
        type='button'
        aria-label={book.view.isOpen ? t('nav.closeBook') : t('nav.openIndex')}
        onClick={toggleIndex}
        disabled={book.view.isLocked}
        className='open-container d-flex d-lg-none no-button-styles'
      >
        <FontAwesomeIcon
          className='responsive-open red'
          icon={book.view.isOpen ? faXmark : faBars}
        />
      </button>

      <h1 className='text-center portfolio-name mb-0'>
        <a href='/' className='old-letter red link-main-title'>
          <span className='d-none d-lg-inline'>{t('nav.name')}</span>
          <span className='d-lg-none'>{t('nav.shortName')}</span>
        </a>
      </h1>

      <div className='d-flex justify-content-around ms-lg-5 align-items-center'>
        <button
          type='button'
          onClick={toggleIndex}
          disabled={book.view.isLocked}
          className='link-nav text-center dark-brown no-button-styles'
        >
          <span className='hover-nav-link letter-title-book d-none d-lg-inline-block'>
            {t('nav.index')}
          </span>
        </button>

        <WoodenButton
          className='ms-lg-5'
          onClick={toggleLanguage}
        >
          {t('nav.switchLanguage')}
        </WoodenButton>
      </div>
    </nav>
  )
}

export default NavBar
