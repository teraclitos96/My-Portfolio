const BookBiography = ({ page }) => (
  <div>
    <p className='letter-body-size text-description'>{page.text}</p>
    <div className='number-page'>{page.number}</div>
  </div>
)

export default BookBiography
