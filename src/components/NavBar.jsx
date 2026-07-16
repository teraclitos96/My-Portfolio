import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import WoodenButton from './WoodenButton'
import '../styles/all.css'

const NavBar = ({ language, onToggleLanguage, isCompact, book }) => {
  const name = language === 'english' ? 'FRANCISCO TERAN' : 'FRANCISCO TERÁN'
  const shortName = language === 'english' ? 'F.TERAN' : 'F.TERÁN'
  const toggleIndex = () => book.actions.toggleIndex(isCompact)

  return (
    <nav className='px-3 px-lg-5 d-flex justify-content-between align-items-center nav-bar'>
      <button
        type='button'
        aria-label={book.view.isOpen ? 'Close book' : 'Open index'}
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
          <span className='d-none d-lg-inline'>{name}</span>
          <span className='d-lg-none'>{shortName}</span>
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
            {language === 'english' ? 'Index' : 'Índice'}
          </span>
        </button>

        <WoodenButton
          className='ms-lg-5'
          onClick={onToggleLanguage}
        >
          {language === 'english' ? 'Español' : 'English'}
        </WoodenButton>
      </div>
    </nav>
  )
}

export default NavBar
