const sharedLinks = {
  architecture: {
    website: 'https://diegohelguera.com/',
    github: 'https://github.com/teraclitos/Portafolio-Diego-Helguera'
  },
  godubi: {
    website: 'https://godubi.com/'
  },
  nonighter: {
    website: 'https://nonighter.com/'
  },
  portfolio: {
    website: 'https://franciscoteran.vercel.app/',
    github: 'https://github.com/teraclitos/My-Portfolio'
  }
}

const sharedImages = {
  architecture: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1685548879/portfolio_diego_foto_gae0mw.png',
  godubi: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1726001088/GODUBI_mbkti2.jpg',
  nonighter: '/images/nonighter-placeholder.svg',
  portfolio: 'https://res.cloudinary.com/duuwqmpmn/image/upload/v1729102707/my-portfolio_cicraz.png'
}

const projectsEnglish = [
  {
    id: 'architecture-portfolio',
    navigationLabel: 'Architecture Portfolio',
    title: 'Architecture Portfolio',
    subtitle: 'Architecture studio website',
    description: 'Built a responsive portfolio for an architecture studio with a custom visual composition, interactive project gallery and image zoom. Created a tailored layout that preserves the original art direction across screen sizes.',
    image: {
      src: sharedImages.architecture,
      alt: 'Architecture studio portfolio project gallery'
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    actions: [
      { label: 'GitHub', href: sharedLinks.architecture.github, type: 'github' },
      { label: 'Visit Website', href: sharedLinks.architecture.website, type: 'website' }
    ]
  },
  {
    id: 'godubi',
    navigationLabel: 'Godubi',
    title: 'Godubi',
    subtitle: 'Collaborative Work Platform · Sep 2023 – Jan 2025',
    description: 'Built frontend workflows for a collaborative work platform, including activity feeds, files, task boards, calendars, meetings and real-time chat. Centralized application state in Vuex and implemented WebSocket and payment-related integrations.',
    image: {
      src: sharedImages.godubi,
      alt: 'Godubi collaborative work platform dashboard'
    },
    technologies: ['Vue 2', 'Vuex', 'Vuexy', 'WebSockets'],
    actions: [
      { label: 'Visit Website', href: sharedLinks.godubi.website, type: 'website' }
    ]
  },
  {
    id: 'nonighter-excel-add-in',
    navigationLabel: 'NoNighter',
    title: 'NoNighter — Excel Add-in',
    subtitle: 'Frontend Developer · Jan 2025 – Jul 2026',
    description: 'Developed features for a Microsoft Excel add-in used in professional financial modeling. Built React, Office.js and Fluent UI interfaces integrated with AWS and DynamoDB services, and improved observability with Grafana Faro.',
    image: {
      src: sharedImages.nonighter,
      alt: 'Generic preview for the NoNighter Microsoft Excel add-in'
    },
    technologies: ['React', 'Office.js', 'Fluent UI', 'AWS', 'DynamoDB'],
    actions: [
      { label: 'Visit Website', href: sharedLinks.nonighter.website, type: 'website' }
    ]
  },
  {
    id: 'my-portfolio',
    navigationLabel: 'My Portfolio',
    title: 'My Portfolio',
    subtitle: 'Interactive developer portfolio',
    description: 'Designed and built an interactive book-inspired portfolio with animated page navigation, responsive layouts and bilingual content. Refactored the page-turning behavior into reusable components and native React hooks while preserving its literary visual identity.',
    image: {
      src: sharedImages.portfolio,
      alt: 'Interactive book-inspired developer portfolio'
    },
    technologies: ['React', 'React Router', 'Bootstrap'],
    actions: [
      { label: 'GitHub', href: sharedLinks.portfolio.github, type: 'github' },
      { label: 'View Project', href: sharedLinks.portfolio.website, type: 'website' }
    ]
  }
]

const projectsSpanish = [
  {
    id: 'architecture-portfolio',
    navigationLabel: 'Portfolio de arquitectura',
    title: 'Portfolio de arquitectura',
    subtitle: 'Sitio web para estudio de arquitectura',
    description: 'Desarrollé un portfolio responsive para un estudio de arquitectura, con composición visual personalizada, galería interactiva y zoom de imágenes. Creé un layout que conserva la dirección artística original en distintos tamaños de pantalla.',
    image: {
      src: sharedImages.architecture,
      alt: 'Galería de proyectos del portfolio de un estudio de arquitectura'
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    actions: [
      { label: 'GitHub', href: sharedLinks.architecture.github, type: 'github' },
      { label: 'Visitar sitio', href: sharedLinks.architecture.website, type: 'website' }
    ]
  },
  {
    id: 'godubi',
    navigationLabel: 'Godubi',
    title: 'Godubi',
    subtitle: 'Plataforma de trabajo colaborativo · Sep 2023 – Ene 2025',
    description: 'Desarrollé flujos para una plataforma de trabajo colaborativo, incluyendo actividad, archivos, tareas, calendarios, reuniones y chat en tiempo real. Centralicé el estado en Vuex e implementé integraciones con WebSockets y pagos.',
    image: {
      src: sharedImages.godubi,
      alt: 'Panel de la plataforma de trabajo colaborativo Godubi'
    },
    technologies: ['Vue 2', 'Vuex', 'Vuexy', 'WebSockets'],
    actions: [
      { label: 'Visitar sitio', href: sharedLinks.godubi.website, type: 'website' }
    ]
  },
  {
    id: 'nonighter-excel-add-in',
    navigationLabel: 'NoNighter',
    title: 'NoNighter — Complemento de Excel',
    subtitle: 'Frontend Developer · Ene 2025 – Jul 2026',
    description: 'Desarrollé funcionalidades para un complemento de Microsoft Excel usado en modelado financiero profesional. Construí interfaces con React, Office.js y Fluent UI, integradas con servicios en AWS y DynamoDB, y mejoré la observabilidad con Grafana Faro.',
    image: {
      src: sharedImages.nonighter,
      alt: 'Vista genérica del complemento de Microsoft Excel de NoNighter'
    },
    technologies: ['React', 'Office.js', 'Fluent UI', 'AWS', 'DynamoDB'],
    actions: [
      { label: 'Visitar sitio', href: sharedLinks.nonighter.website, type: 'website' }
    ]
  },
  {
    id: 'my-portfolio',
    navigationLabel: 'Mi portfolio',
    title: 'Mi portfolio',
    subtitle: 'Portfolio interactivo para desarrolladores',
    description: 'Diseñé y desarrollé un portfolio interactivo inspirado en un libro, con navegación animada, diseño responsive y contenido bilingüe. Refactoricé el cambio de páginas en componentes reutilizables y hooks nativos, conservando su identidad visual literaria.',
    image: {
      src: sharedImages.portfolio,
      alt: 'Portfolio interactivo para desarrolladores inspirado en un libro'
    },
    technologies: ['React', 'React Router', 'Bootstrap'],
    actions: [
      { label: 'GitHub', href: sharedLinks.portfolio.github, type: 'github' },
      { label: 'Ver proyecto', href: sharedLinks.portfolio.website, type: 'website' }
    ]
  }
]

const projectsByLanguage = {
  english: projectsEnglish,
  spanish: projectsSpanish
}

export { projectsByLanguage }
