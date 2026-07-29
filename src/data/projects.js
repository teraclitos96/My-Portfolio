const projectDefinitions = [
  {
    id: 'architecture-portfolio',
    importance: 1,
    translationKey: 'architecture',
    imageSrc: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1685548879/portfolio_diego_foto_gae0mw.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    actions: [
      {
        labelKey: 'github',
        href: 'https://github.com/teraclitos/Portafolio-Diego-Helguera',
        type: 'github'
      },
      {
        labelKey: 'website',
        href: 'https://diegohelguera.com/',
        type: 'website'
      }
    ]
  },
  {
    id: 'indiana-autos',
    importance: 3,
    translationKey: 'indiana',
    imageSrc: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1784227668/indiana-autos_vadtnl.png',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Cloudinary'],
    actions: [
      {
        labelKey: 'website',
        href: 'https://indiana.com.ar/',
        type: 'website'
      }
    ]
  },
  {
    id: 'godubi',
    importance: 4,
    translationKey: 'godubi',
    imageSrc: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1784227820/godubi_sn9xtx.png',
    technologies: ['Vue.js', 'Vuex', 'Vuexy', 'WebSockets'],
    actions: [
      {
        labelKey: 'website',
        href: 'https://godubi.com/',
        type: 'website'
      }
    ]
  },
  {
    id: 'nonighter-excel-add-in',
    importance: 5,
    translationKey: 'nonighter',
    imageSrc: '/images/nonighter-placeholder.svg',
    technologies: [
      'React',
      'TypeScript',
      'Office.js',
      'Microsoft Excel Add-ins',
      'Fluent UI',
      'AWS',
      'DynamoDB',
      'Grafana Faro'
    ],
    actions: [
      {
        labelKey: 'website',
        href: 'https://nonighter.com/',
        type: 'website'
      }
    ]
  },
  {
    id: 'my-portfolio',
    importance: 2,
    translationKey: 'portfolio',
    imageSrc: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1784228347/my-portfolio_utoqzt.png',
    technologies: ['React', 'React Router', 'Bootstrap'],
    actions: [
      {
        labelKey: 'github',
        href: 'https://github.com/teraclitos/My-Portfolio',
        type: 'github'
      },
      {
        labelKey: 'viewProject',
        href: 'https://franciscoteran.vercel.app/',
        type: 'website'
      }
    ]
  }
]

const createProjects = ({ t }) => projectDefinitions.map(project => {
  const translationPath = `projects:${project.translationKey}`

  return {
    id: project.id,
    importance: project.importance,
    navigationLabel: t(`${translationPath}.navigationLabel`),
    title: t(`${translationPath}.title`),
    subtitle: t(`${translationPath}.subtitle`),
    description: t(`${translationPath}.description`),
    image: {
      src: project.imageSrc,
      alt: t(`${translationPath}.imageAlt`)
    },
    technologies: project.technologies,
    actions: project.actions.map(({ labelKey, ...action }) => ({
      ...action,
      label: t(`common:actions.${labelKey}`)
    }))
  }
})

export { createProjects }
