const projectDefinitions = [
  {
    id: 'architecture-portfolio',
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
    translationKey: 'godubi',
    imageSrc: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1784227820/godubi_sn9xtx.png',
    technologies: ['Vue 2', 'Vuex', 'Vuexy', 'WebSockets'],
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
    translationKey: 'nonighter',
    imageSrc: '/images/nonighter-placeholder.svg',
    technologies: ['React', 'Office.js', 'Fluent UI', 'AWS', 'DynamoDB'],
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
