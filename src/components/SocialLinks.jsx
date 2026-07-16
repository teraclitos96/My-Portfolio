import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

const socialLinks = [
  {
    id: 'email',
    href: 'mailto:tefans12@gmail.com',
    icon: faEnvelope
  },
  {
    id: 'github',
    href: 'https://github.com/teraclitos',
    icon: faGithub,
    external: true
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/francisco-teran/',
    icon: faLinkedin,
    external: true
  },
  {
    id: 'whatsapp',
    hrefByLanguage: {
      en: 'https://wa.link/otcpwg',
      es: 'https://wa.link/ibnibl'
    },
    icon: faWhatsapp,
    external: true
  }
]

const SocialLinks = () => {
  const { t, i18n } = useTranslation('common')
  const language = i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en'

  return (
    <nav
      className='d-flex justify-content center icon-footer-container'
      aria-label={t('social.navigation')}
    >
      {socialLinks.map(link => (
        <a
          key={link.id}
          className='icon-footer-link'
          href={link.hrefByLanguage?.[language] ?? link.href}
          aria-label={t(`social.${link.id}`)}
          {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <FontAwesomeIcon className='icon-footer' icon={link.icon} />
        </a>
      ))}
    </nav>
  )
}

export default SocialLinks
