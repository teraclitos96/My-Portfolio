import WoodenButton from '../../WoodenButton'

const BookAboutMe = ({ page, downloadCV }) => {
  return (
    <div className='d-flex flex-column align-items-center '>
      <h2 className='title-size letter-title-book'>
        {page.title}
      </h2>
      <img className='img-me mt-3' src={page.url} alt='me' />
      <WoodenButton
        variant='compact'
        className='mt-3'
        onClick={(e) => {
          e.stopPropagation()
          downloadCV()
        }}
      >
        CV
      </WoodenButton>
    </div>

  )
}

export default BookAboutMe
