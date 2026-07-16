import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/all.css'

const NotFoundPage = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    document.title = 'Francisco Teran | Error 404'
  }, [])

  return (
    <main className='error-404-container'>
      <img
        src='https://res.cloudinary.com/duuwqmpmn/image/upload/v1686004427/logo-error-404_vnksdy.png'
        alt='Página no encontrada'
        className='logo-404'
        onLoad={() => setIsImageLoaded(true)}
      />
      <Link
        style={{ display: isImageLoaded ? 'inline-block' : 'none' }}
        to='/'
        className='letter-title-book dark-brown back-main link-404'
      >
        Back to main page
      </Link>
    </main>
  )
}

export default NotFoundPage
