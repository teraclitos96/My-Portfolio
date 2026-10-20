import WoodenButton from '../../WoodenButton'
import { optimizeImage } from '../../../utils/images'

const AboutView = ({ page, downloadCV }) => {
  return (
    <div className='d-flex flex-column align-items-center '>
      <h2 className='title-size letter-title-book'>{page.title}</h2>
      <img
        className='img-me mt-3'
        src={optimizeImage(page.url, 400)}
        width='382'
        height='323'
        loading='lazy'
        decoding='async'
        alt={page.imageAlt}
      />
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

export default AboutView
