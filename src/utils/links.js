const getLinkTarget = ({ href }) => (
  href.includes('franciscoteran') ? '_self' : '_blank'
)

export { getLinkTarget }
