import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import WoodenButton from './WoodenButton'
import { getPagePath } from '../utils/seo'
import '../styles/all.css'

const NavBar = ({ isCompact, book, project }) => {
  const { t, i18n } = useTranslation('common')
  const language = i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en'
  const toggleIndex = () => book.actions.toggleIndex(isCompact)

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
        <a href={getPagePath(language)} className='old-letter red link-main-title'>
          {project && <span className='visually-hidden'>{project.title} — </span>}
          {isCompact ? t('nav.shortName') : t('nav.name')}
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
          href={getPagePath(language === 'en' ? 'es' : 'en', project?.id)}
          hrefLang={language === 'en' ? 'es' : 'en'}
        >
          {t('nav.switchLanguage')}
        </WoodenButton>
      </div>
    </nav>
  )
}

export default NavBar
