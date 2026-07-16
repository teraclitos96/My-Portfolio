import { projectsByLanguage } from './projects'

const selectedProjectsEnglish = projectsByLanguage.english
const selectedProjectsSpanish = projectsByLanguage.spanish

const dataBookSpanish = [
  {
    id: 'page1',
    frontPage: {
      tapeBookTitleFirst: 'MI',
      tapeBookTitleSecond: 'PORTFOLIO'
    },
    backPage: {

    }
  },

  {
    id: 'page2',
    frontPage: {
      title: 'Mi Portfolio ',
      subtitle: 'Francisco Terán'
    },
    backPage: {
    }
  },

  {
    id: 'page3',
    frontPage: {
      title: 'Índice'
    },
    backPage: {
      title: 'Acerca de mí',
      url: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1725999657/Foto_perfil_1_gt9sw3.jpg',
      number: 1
    }

  },
  {
    id: 'page4',
    frontPage: {
      descriptionProject: `Soy un asombrado del razonamiento lógico; de
cómo a partir de principios simples, sólidos y
evidentes pueden surgir estructuras bellas y
complejas. El hecho de poder construir estos edificios lógicos
 "dialogando" con la computadora en un
inequívoco y a su vez creativo lenguaje es algo
fascinante que deseo seguir perfeccionando.
 En mi tiempo libre me gusta leer todo tipo de libros (literatura, filosofìa, ciencia, etc) y hacer
deportes, en particular tenis`,
      number: 2

    },
    backPage: {
      number: 3
    }

  },
  {
    id: 'page5',
    frontPage: {
      title: 'Mis proyectos',
      number: 4
    },
    backPage: {
      project: selectedProjectsSpanish[0],
      number: 5
    }
  },
  {
    id: 'page6',
    frontPage: {
      project: selectedProjectsSpanish[0],
      number: 6

    },
    backPage: {
      project: selectedProjectsSpanish[1],
      number: 7

    }

  },
  {
    id: 'page7',
    frontPage: {
      project: selectedProjectsSpanish[1],
      number: 8

    },
    backPage: {
      project: selectedProjectsSpanish[2],
      number: 9

    }

  },
  {
    id: 'page8',
    frontPage: {
      project: selectedProjectsSpanish[2],
      number: 10

    },
    backPage: {
      project: selectedProjectsSpanish[3],
      number: 11

    }

  },
  {
    id: 'page9',
    frontPage: {
      project: selectedProjectsSpanish[3],
      number: 12

    },
    backPage: {
      title: ''

    }

  }
]
const dataBookEnglish = [
  {
    id: 'page1',
    frontPage: {
      tapeBookTitleFirst: 'MY',
      tapeBookTitleSecond: 'PORTFOLIO'

    },
    backPage: {

    }

  },
  {
    id: 'page2',
    frontPage: {
      title: 'My portfolio',
      subtitle: 'Francisco Teran'

    },
    backPage: {

    }

  },

  {
    id: 'page3',
    frontPage: {
      title: 'Index',
      descriptionProject: ''

    },
    backPage: {
      title: 'About me',
      url: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1725999657/Foto_perfil_1_gt9sw3.jpg',
      number: 1

    }

  },

  {
    id: 'page4',
    frontPage: {
      descriptionProject: `I am amazed by logical reasoning; of
how from simple, solid and
evident principles, can emerge beautiful and
complex structures. Being able to build these
 logical towers by having a "dialogue" with the computer in a
straightforward and at the same time creative language is something
fascinating that I want to improve more and more. In my
 leisure time I love to read all kinds of books (literature, philosophy, science, etc.) and do
sports, in particular tennis.`,
      number: 2

    },

    backPage: {
      number: 3

    }

  },
  {
    id: 'page5',
    frontPage: {
      title: 'My projects',
      number: 4
    },
    backPage: {
      project: selectedProjectsEnglish[0],
      number: 5
    }
  },
  {
    id: 'page6',
    frontPage: {
      project: selectedProjectsEnglish[0],
      number: 6

    },
    backPage: {
      project: selectedProjectsEnglish[1],
      number: 7

    }

  },
  {
    id: 'page7',
    frontPage: {
      project: selectedProjectsEnglish[1],
      number: 8

    },
    backPage: {
      project: selectedProjectsEnglish[2],
      number: 9

    }

  },
  {
    id: 'page8',
    frontPage: {
      project: selectedProjectsEnglish[2],
      number: 10

    },
    backPage: {
      project: selectedProjectsEnglish[3],
      number: 11

    }

  },
  {
    id: 'page9',
    frontPage: {
      project: selectedProjectsEnglish[3],
      number: 12

    },
    backPage: {
      title: ''

    }

  }
]

const indexEnglish =
 [{ id: 'index1', title: 'Projects', destinationPage: 4 },
   { id: 'index2', title: 'About me', destinationPage: 3 },
   { id: 'index3', title: 'Contact' }
 ]

const indexSpanish =
[{ id: 'index1', title: 'Proyectos', destinationPage: 4 },
  { id: 'index2', title: 'Acerca de mí', destinationPage: 3 },
  { id: 'index3', title: 'Contacto' }
]

const createProjectsNavigation = projects => projects.map((project, index) => ({
  id: project.id,
  projectName: `${index + 1}- ${project.navigationLabel}`,
  destinationPage: index + 5
}))

const allProjectsSpanish = createProjectsNavigation(selectedProjectsSpanish)
const allProjectsEnglish = createProjectsNavigation(selectedProjectsEnglish)

const portfolioContentByLanguage = {
  english: {
    pages: dataBookEnglish,
    projects: allProjectsEnglish,
    index: indexEnglish,
    cvFile: '/Francisco_Teran_CV_EN.pdf'
  },
  spanish: {
    pages: dataBookSpanish,
    projects: allProjectsSpanish,
    index: indexSpanish,
    cvFile: '/Francisco_Teran_CV_ES.pdf'
  }
}

export { portfolioContentByLanguage }
