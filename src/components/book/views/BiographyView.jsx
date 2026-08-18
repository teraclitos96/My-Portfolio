const BiographyView = ({ page }) => (
  <div>
    <p className='letter-body-size text-description biography-description'>{page.text}</p>
    <div className='number-page'>{page.number}</div>
  </div>
)

export default BiographyView
