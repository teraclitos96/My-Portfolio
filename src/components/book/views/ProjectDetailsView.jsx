import { useTranslation } from 'react-i18next';
import ProjectActions from '../project/ProjectActions';
import ProjectTechnologyList from '../project/ProjectTechnologyList';

const ProjectDetailsView = ({ page }) => {
  const { t } = useTranslation('common');

  return (
    <section
      className="project-details"
      aria-label={t('project.detailsAria', { title: page.project.title })}
    >
      <p className="letter-body-size text-description project-description">
        {page.project.description}
      </p>
      <div className="project-stack">
        <h3 className="project-stack-title letter-title-book">{t('project.stack')}</h3>
        <ProjectTechnologyList technologies={page.project.technologies} />
      </div>
      <ProjectActions actions={page.project.actions} projectTitle={page.project.title} />
      <div className="number-page">{page.number}</div>
    </section>
  );
};

export default ProjectDetailsView;
