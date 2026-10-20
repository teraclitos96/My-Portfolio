import { optimizeImage } from '../../../utils/images'

const CoverView = ({ page }) => {
  return (
    <div className='portada-container d-flex flex-column justify-content-center align-items-center'>
      <div className='title-book-container'>
        <h2 className='golden text-center old-letter first-title-tape'>
          {page.tapeBookTitleFirst}
        </h2>
        <h2 className='golden  old-letter second-title-tape'>{page.tapeBookTitleSecond}</h2>
      </div>
      <img
        className='img-logo-libro'
        src={optimizeImage(
          'https://res.cloudinary.com/duuwqmpmn/image/upload/v1685995705/logo-fondo-librorojo_qplqze.png',
          320
        )}
        width='291'
        height='298'
        decoding='async'
        alt={page.logoAlt}
      />
    </div>
  )
}

export default CoverView
