const ProjectNavigationItem = ({ project, handleNavigate }) => {
  return (
    <li>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNavigate(project.destinationSheet);
        }}
        className=" projects  letter-title-book no-button-styles  "
      >
        {project.projectName}
      </button>
    </li>
  );
};

export default ProjectNavigationItem;
