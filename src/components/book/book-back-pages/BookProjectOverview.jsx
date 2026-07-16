import { getLinkTarget } from '../../../utils/links'

const BookProjectOverview = ({ page }) => {
  const { project } = page
  const websiteAction = project.actions.find(action => action.type === 'website')
  const projectImage = <img className='project-image' src={project.image.src} alt={project.image.alt} />

  return (
    <section className='project-overview' aria-labelledby={`${project.id}-title`}>
      <header className='project-heading text-center'>
        <h2 id={`${project.id}-title`} className='letter-title-book title-size'>
          {project.title}
        </h2>
        {project.subtitle && <p className='project-subtitle'>{project.subtitle}</p>}
      </header>
      <div className='project-image-container'>
        {websiteAction
          ? (
            <a
              className='project-image-link'
              href={websiteAction.href}
              target={getLinkTarget({ href: websiteAction.href })}
              rel='noreferrer'
              aria-label={`${websiteAction.label}: ${project.title}`}
              onClick={event => event.stopPropagation()}
            >
              {projectImage}
            </a>
            )
          : projectImage}
      </div>
    </section>
  )
}

export default BookProjectOverview
