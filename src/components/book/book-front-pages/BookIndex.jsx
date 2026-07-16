import BookLinkToMail from './BookLinkToMail'

const BookIndex = ({ item, handleNavigate, index }) => {
  return (
    <li>
      {index === 2
        ? (
          <BookLinkToMail item={item} />
          )
        : (
          <button
            type='button'
            className='mb-2  projects letter-title-book no-button-styles'
            onClick={(e) => {
              e.stopPropagation()
              handleNavigate(item.destinationPage)
            }}
          >
            {item.title}
          </button>
          )}
    </li>
  )
}

export default BookIndex
