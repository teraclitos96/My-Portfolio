import { useEffect, useState } from 'react'
import '../styles/all.css'

const Loader = () => {
  const [phase, setPhase] = useState('visible')
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), 2000)
    const hideTimer = setTimeout(() => setPhase('hidden'), 2500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (phase === 'hidden') return null

  return (
    <div
      style={{
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'auto'
      }}
      className='loader-container'
      aria-hidden='true'
    >
      <div className='logo-loading-container'>
        <img
          onLoad={() => setShowSpinner(true)}
          src='https://res.cloudinary.com/duuwqmpmn/image/upload/v1685998235/logo-loading-nuevo_dxsgnj.png'
          alt=''
          className='logo-loading'
        />
        {showSpinner && <div className='lds-dual-ring' />}
      </div>
    </div>
  )
}

export default Loader
