const IndexNavigationItem = ({ item, handleNavigate }) => {
  return (
    <li>
      {item.href ? (
        <a
          className="mb-2 projects letter-title-book contact-link"
          href={item.href}
          onClick={(event) => event.stopPropagation()}
        >
          {item.title}
        </a>
      ) : (
        <button
          type="button"
          className="mb-2  projects letter-title-book no-button-styles"
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate(item.destinationSheet);
          }}
        >
          {item.title}
        </button>
      )}
    </li>
  );
};

export default IndexNavigationItem;
