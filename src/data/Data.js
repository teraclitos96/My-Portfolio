import { projectsByLanguage } from './projects'
import {
  BOOK_SHEET,
  BOOK_PAGE_NAVIGATION,
  BOOK_PAGE_TYPE
} from '../utils/book'

const profileImage = 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1725999657/Foto_perfil_1_gt9sw3.jpg'
const contactHref = 'mailto:tefans12@gmail.com'

const copyByLanguage = {
  english: {
    coverFirstLine: 'MY',
    coverSecondLine: 'PORTFOLIO',
    innerTitle: 'My portfolio',
    author: 'Francisco Teran',
    indexTitle: 'Index',
    projectsLabel: 'Projects',
    aboutLabel: 'About me',
    contactLabel: 'Contact',
    aboutTitle: 'About me',
    projectsTitle: 'My projects',
    biography: `I am fascinated by logical reasoning and by the way simple, solid, and self-evident principles can give rise to beautiful and complex structures.
Programming allows me to build these logical structures through a "dialogue" with the computer, using a language that is both precise and creative. It is this combination of logic, creativity, and continuous learning that motivates me to keep improving as a software developer.`,
    cvFile: '/Francisco_Teran_CV_EN.pdf'
  },
  spanish: {
    coverFirstLine: 'MI',
    coverSecondLine: 'PORTFOLIO',
    innerTitle: 'Mi Portfolio ',
    author: 'Francisco Terán',
    indexTitle: 'Índice',
    projectsLabel: 'Proyectos',
    aboutLabel: 'Acerca de mí',
    contactLabel: 'Contacto',
    aboutTitle: 'Acerca de mí',
    projectsTitle: 'Mis proyectos',
    biography: `Soy un asombrado del razonamiento lógico; de
cómo a partir de principios simples, sólidos y
evidentes pueden surgir estructuras bellas y
complejas. El hecho de poder construir estos edificios lógicos
 "dialogando" con la computadora en un
inequívoco y a su vez creativo lenguaje es algo
fascinante que deseo seguir perfeccionando.
 En mi tiempo libre me gusta leer todo tipo de libros (literatura, filosofía, ciencia, etc.) y hacer
deportes, en particular tenis`,
    cvFile: '/Francisco_Teran_CV_ES.pdf'
  }
}

const createIntroSheets = copy => [
  {
    id: 'page1',
    frontPage: {
      type: BOOK_PAGE_TYPE.cover,
      tapeBookTitleFirst: copy.coverFirstLine,
      tapeBookTitleSecond: copy.coverSecondLine
    },
    backPage: { type: BOOK_PAGE_TYPE.blank }
  },
  {
    id: 'page2',
    frontPage: {
      type: BOOK_PAGE_TYPE.innerCover,
      title: copy.innerTitle,
      subtitle: copy.author
    },
    backPage: { type: BOOK_PAGE_TYPE.blank }
  },
  {
    id: 'page3',
    frontPage: {
      type: BOOK_PAGE_TYPE.index,
      title: copy.indexTitle
    },
    backPage: {
      type: BOOK_PAGE_TYPE.about,
      navigation: BOOK_PAGE_NAVIGATION.index,
      title: copy.aboutTitle,
      url: profileImage,
      number: 1
    }
  },
  {
    id: 'page4',
    frontPage: {
      type: BOOK_PAGE_TYPE.biography,
      text: copy.biography,
      number: 2
    },
    backPage: {
      type: BOOK_PAGE_TYPE.blank,
      navigation: BOOK_PAGE_NAVIGATION.index,
      number: 3
    }
  }
]

const createProjectSheets = ({ copy, projects }) => {
  const projectSheets = projects.map((project, index) => ({
    id: `page${index + BOOK_SHEET.projects + 1}`,
    frontPage: index === 0
      ? {
          type: BOOK_PAGE_TYPE.projects,
          title: copy.projectsTitle,
          number: 4
        }
      : {
          type: BOOK_PAGE_TYPE.projectDetails,
          project: projects[index - 1],
          number: 4 + index * 2
        },
    backPage: {
      type: BOOK_PAGE_TYPE.projectOverview,
      navigation: BOOK_PAGE_NAVIGATION.projects,
      project,
      number: 5 + index * 2
    }
  }))

  return [
    ...projectSheets,
    {
      id: `page${projects.length + BOOK_SHEET.projects + 1}`,
      frontPage: {
        type: BOOK_PAGE_TYPE.projectDetails,
        project: projects[projects.length - 1],
        number: 4 + projects.length * 2
      },
      backPage: { type: BOOK_PAGE_TYPE.backCover }
    }
  ]
}

const createBookPages = ({ copy, projects }) => [
  ...createIntroSheets(copy),
  ...createProjectSheets({ copy, projects })
]

const createIndexNavigation = copy => [
  {
    id: 'projects',
    title: copy.projectsLabel,
    destinationSheet: BOOK_SHEET.projects
  },
  {
    id: 'about',
    title: copy.aboutLabel,
    destinationSheet: BOOK_SHEET.about
  },
  {
    id: 'contact',
    title: copy.contactLabel,
    href: contactHref
  }
]

const createProjectsNavigation = projects => projects.map((project, index) => ({
  id: project.id,
  projectName: `${index + 1}- ${project.navigationLabel}`,
  destinationSheet: index + BOOK_SHEET.firstProject
}))

const createPortfolioContent = language => {
  const copy = copyByLanguage[language]
  const projects = projectsByLanguage[language]

  return {
    pages: createBookPages({ copy, projects }),
    projects: createProjectsNavigation(projects),
    index: createIndexNavigation(copy),
    cvFile: copy.cvFile
  }
}

const portfolioContentByLanguage = {
  english: createPortfolioContent('english'),
  spanish: createPortfolioContent('spanish')
}

export { portfolioContentByLanguage }
