import { useTranslation } from 'react-i18next'
import { getPagePath } from '../../../utils/seo'

const ProjectNavigationItem = ({ project, handleNavigate }) => {
  const { i18n } = useTranslation()
  return (
    <li>
      <a
        href={getPagePath(i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en', project.id)}
        onClick={(e) => {
          e.stopPropagation()
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          e.preventDefault()
          handleNavigate(project.destinationSheet)
        }}
        className=' projects  letter-title-book no-button-styles  '
      >
        {project.projectName}
      </a>
    </li>
  )
}

export default ProjectNavigationItem
