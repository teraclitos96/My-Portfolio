export const optimizeImage = (src, width = 640) =>
  src.startsWith('https://res.cloudinary.com/')
    ? src.replace('/image/upload/', `/image/upload/f_auto,q_auto,c_limit,w_${width}/`)
    : src

export const getImageSources = (src, originalWidth = 960) => {
  if (!src.startsWith('https://res.cloudinary.com/')) return undefined
  const maximum = Math.min(originalWidth, 960)
  const widths = [...[320, 640].filter((width) => width < maximum), maximum]
  return widths.map((width) => `${optimizeImage(src, width)} ${width}w`).join(', ')
}
