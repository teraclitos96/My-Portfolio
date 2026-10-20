export const SITE_URL = 'https://franciscoteran.vercel.app'
export const LANGUAGES = ['en', 'es']

export const getPagePath = (language, projectId) =>
  `/${language}/${projectId ? `projects/${projectId}/` : ''}`

export const getPageMetadata = ({ language, project }) => {
  const title = project
    ? `${project.title} — Francisco Terán`
    : language === 'es'
      ? 'Francisco Terán — Desarrollador Full-Stack | React y Node.js'
      : 'Francisco Terán — Full-Stack Developer | React & Node.js'
  const fullDescription = project
    ? project.description
    : language === 'es'
      ? 'Portfolio de Francisco Terán, desarrollador full-stack especializado en React, Node.js, Vue, complementos de Excel y aplicaciones en la nube.'
      : 'Portfolio of Francisco Terán, a full-stack developer specializing in React, Node.js, Vue, Excel Add-ins, and cloud-based applications.'

  const description =
    fullDescription.length <= 160
      ? fullDescription
      : `${fullDescription.slice(0, 157).replace(/\s+\S*$/, '')}…`
  return { title, description, url: `${SITE_URL}${getPagePath(language, project?.id)}` }
}
