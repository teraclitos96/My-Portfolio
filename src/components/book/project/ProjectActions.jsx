import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import WoodenButton from '../../WoodenButton'
import { getLinkTarget } from '../../../utils/links'

const ProjectActions = ({ actions, projectTitle }) => (
  <div className='project-actions d-flex justify-content-center flex-wrap' onClick={event => event.stopPropagation()}>
    {actions.map(action => (
      <WoodenButton
        key={`${action.type}-${action.href}`}
        variant='project'
        className={`project-action-${action.type}`}
        href={action.href}
        target={getLinkTarget({ href: action.href })}
        aria-label={`${action.label}: ${projectTitle}`}
      >
        {action.type === 'github' && <FontAwesomeIcon icon={faGithub} aria-hidden='true' />}
        <span>{action.label}</span>
      </WoodenButton>
    ))}
  </div>
)

export default ProjectActions
