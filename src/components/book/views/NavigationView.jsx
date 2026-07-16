import { BOOK_PAGE_TYPE } from '../../../utils/book'
import IndexNavigationItem from '../navigation/IndexNavigationItem'
import ProjectNavigationItem from '../navigation/ProjectNavigationItem'

const NavigationView = ({ page, sheetIndex, content, handleNavigate }) => {
  const isIndex = page.type === BOOK_PAGE_TYPE.index

  return (
    <div>
      <h2 className='letter-title-book title-size text-center mb-3'>
        {page.title}
      </h2>
      <ul
        className='book-navigation-list list-style-none p-0 d-flex flex-column'
        data-book-navigation-sheet={sheetIndex}
      >
        {isIndex
          ? content.index.map(item => (
            <IndexNavigationItem
              key={item.id}
              item={item}
              handleNavigate={handleNavigate}
            />
          ))
          : content.projects.map(project => (
            <ProjectNavigationItem
              key={project.id}
              project={project}
              handleNavigate={handleNavigate}
            />
          ))}
      </ul>
      {page.number != null && <span className='number-page'>{page.number}</span>}
    </div>
  )
}

export default NavigationView
