import { createProjects } from './projects'
import { generalTechnologies } from './technologies'
import {
  BOOK_SHEET,
  BOOK_PAGE_NAVIGATION,
  BOOK_PAGE_TYPE
} from '../utils/book'

const profileImage = 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1725999657/Foto_perfil_1_gt9sw3.jpg'
const contactHref = 'mailto:tefans12@gmail.com'

const createCopy = t => ({
  coverFirstLine: t('book:cover.firstLine'),
  coverSecondLine: t('book:cover.secondLine'),
  coverLogoAlt: t('book:cover.logoAlt'),
  innerTitle: t('book:inner.title'),
  author: t('book:inner.author'),
  indexTitle: t('book:index.title'),
  projectsLabel: t('book:index.projects'),
  aboutLabel: t('book:index.about'),
  contactLabel: t('book:index.contact'),
  aboutTitle: t('book:about.title'),
  profileAlt: t('book:about.profileAlt'),
  projectsTitle: t('book:projects.title'),
  biography: t('book:about.biography'),
  cvFile: t('book:about.cvFile')
})

const createIntroSheets = copy => [
  {
    id: 'sheet1',
    frontPage: {
      type: BOOK_PAGE_TYPE.cover,
      tapeBookTitleFirst: copy.coverFirstLine,
      tapeBookTitleSecond: copy.coverSecondLine,
      logoAlt: copy.coverLogoAlt
    },
    backPage: { type: BOOK_PAGE_TYPE.blank }
  },
  {
    id: 'sheet2',
    frontPage: {
      type: BOOK_PAGE_TYPE.innerCover,
      title: copy.innerTitle,
      subtitle: copy.author
    },
    backPage: { type: BOOK_PAGE_TYPE.blank }
  },
  {
    id: 'sheet3',
    frontPage: {
      type: BOOK_PAGE_TYPE.index,
      title: copy.indexTitle
    },
    backPage: {
      type: BOOK_PAGE_TYPE.about,
      navigation: BOOK_PAGE_NAVIGATION.index,
      title: copy.aboutTitle,
      url: profileImage,
      imageAlt: copy.profileAlt,
      number: 1
    }
  },
  {
    id: 'sheet4',
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
    id: `sheet${index + BOOK_SHEET.projects + 1}`,
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
      id: `sheet${projects.length + BOOK_SHEET.projects + 1}`,
      frontPage: {
        type: BOOK_PAGE_TYPE.projectDetails,
        project: projects[projects.length - 1],
        number: 4 + projects.length * 2
      },
      backPage: { type: BOOK_PAGE_TYPE.backCover }
    }
  ]
}

const createBookSheets = ({ copy, projects }) => [
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

const createTechnologyNavigation = projects => generalTechnologies.reduce((navigation, technology) => {
  const matchingProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => project.technologies.includes(technology))

  if (matchingProjects.length === 0) return navigation

  const target = matchingProjects.reduce((mostImportant, candidate) => (
    candidate.project.importance > mostImportant.project.importance
      ? candidate
      : mostImportant
  ))

  navigation[technology] = {
    destinationSheet: target.index + BOOK_SHEET.firstProject,
    importance: target.project.importance,
    projectId: target.project.id
  }

  return navigation
}, {})

const createPortfolioContent = ({ t }) => {
  const copy = createCopy(t)
  const projects = createProjects({ t })

  return {
    sheets: createBookSheets({ copy, projects }),
    projects: createProjectsNavigation(projects),
    technologyNavigation: createTechnologyNavigation(projects),
    index: createIndexNavigation(copy),
    cvFile: copy.cvFile
  }
}

export { createPortfolioContent }
