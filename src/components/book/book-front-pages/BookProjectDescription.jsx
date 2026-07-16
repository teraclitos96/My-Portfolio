import ProjectActions from '../ProjectActions'
import ProjectTechnologyList from './ProjectTechnologyList'

const BookProjectDescription = ({ page, language }) => {
  return (
    <section className='project-details' aria-label={`${page.project.title} details`}>
      <p className='letter-body-size text-description project-description'>
        {page.project.description}
      </p>
      <div className='project-stack'>
        <h3 className='project-stack-title letter-title-book'>
          {language === 'spanish' ? 'Tecnologías' : 'Tech stack'}
        </h3>
        <ProjectTechnologyList technologies={page.project.technologies} />
      </div>
      <ProjectActions actions={page.project.actions} projectTitle={page.project.title} />
      <div className='number-page'>{page.number}</div>
    </section>
  )
}

export default BookProjectDescription
