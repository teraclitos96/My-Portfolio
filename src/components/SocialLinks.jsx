import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const labelsByLanguage = {
  english: {
    navigation: 'Social links',
    email: 'Send email',
    github: 'View GitHub profile',
    linkedin: 'View LinkedIn profile',
    whatsapp: 'Contact via WhatsApp'
  },
  spanish: {
    navigation: 'Enlaces sociales',
    email: 'Enviar correo electrónico',
    github: 'Ver perfil de GitHub',
    linkedin: 'Ver perfil de LinkedIn',
    whatsapp: 'Contactar por WhatsApp'
  }
}

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
      english: 'https://wa.link/otcpwg',
      spanish: 'https://wa.link/ibnibl'
    },
    icon: faWhatsapp,
    external: true
  }
]

const SocialLinks = ({ language }) => {
  const labels = labelsByLanguage[language]

  return (
    <nav
      className='d-flex justify-content center icon-footer-container'
      aria-label={labels.navigation}
    >
      {socialLinks.map(link => (
        <a
          key={link.id}
          className='icon-footer-link'
          href={link.hrefByLanguage?.[language] ?? link.href}
          aria-label={labels[link.id]}
          {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <FontAwesomeIcon className='icon-footer' icon={link.icon} />
        </a>
      ))}
    </nav>
  )
}

export default SocialLinks
