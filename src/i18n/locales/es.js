const es = {
  common: {
    nav: {
      openIndex: 'Abrir índice',
      closeBook: 'Cerrar libro',
      index: 'Índice',
      switchLanguage: 'English',
      name: 'FRANCISCO TERÁN',
      shortName: 'F.TERÁN'
    },
    portfolio: {
      bookAria: 'Portfolio en forma de libro'
    },
    project: {
      stack: 'Tecnologías',
      detailsAria: 'Detalles de {{title}}'
    },
    actions: {
      github: 'GitHub',
      website: 'Visitar sitio',
      viewProject: 'Ver proyecto'
    },
    social: {
      navigation: 'Enlaces sociales',
      email: 'Enviar correo electrónico',
      github: 'Ver perfil de GitHub',
      linkedin: 'Ver perfil de LinkedIn',
      whatsapp: 'Contactar por WhatsApp'
    },
    footer: {
      logoAlt: 'Logo de Francisco Terán'
    }
  },
  book: {
    cover: {
      firstLine: 'MI',
      secondLine: 'PORTFOLIO',
      logoAlt: 'Logo del libro'
    },
    inner: {
      title: 'Mi portfolio',
      author: 'Francisco Terán'
    },
    index: {
      title: 'Índice',
      projects: 'Proyectos',
      about: 'Acerca de mí',
      contact: 'Contacto'
    },
    about: {
      title: 'Acerca de mí',
      biography:
        'Soy un asombrado del razonamiento lógico; de cómo a partir de principios simples, sólidos y evidentes pueden surgir estructuras bellas y complejas. El hecho de poder construir estos edificios lógicos "dialogando" con la computadora en un inequívoco y a su vez creativo lenguaje es algo fascinante que deseo seguir perfeccionando.\nEn mi tiempo libre me gusta leer todo tipo de libros (literatura, filosofía, ciencia, etc.) y hacer deportes, en particular tenis.',
      profileAlt: 'Perfil de Francisco Terán',
      cvFile: '/Francisco_Teran_CV_ES.pdf'
    },
    projects: {
      title: 'Mis proyectos'
    },
    navigation: {
      label: 'Navegación del libro',
      index: '← Índice',
      indexAriaLabel: 'Volver al índice',
      projects: 'Todos los proyectos',
      projectsAriaLabel: 'Ver todos los proyectos'
    }
  },
  projects: {
    architecture: {
      navigationLabel: 'Portfolio de arquitectura',
      title: 'Portfolio de arquitectura',
      subtitle: 'Sitio web para estudio de arquitectura',
      description:
        'Desarrollé un portfolio responsive para un estudio de arquitectura, con composición visual personalizada, galería interactiva y zoom de imágenes. Creé un layout que conserva la dirección artística original en distintos tamaños de pantalla.',
      imageAlt: 'Galería de proyectos del portfolio de un estudio de arquitectura'
    },
    indiana: {
      navigationLabel: 'Indiana Autos',
      title: 'Indiana Autos',
      subtitle: 'Backend para plataforma de vehículos',
      description:
        'Desarrollé y mantuve el backend de una plataforma para publicar y administrar vehículos. Implementé APIs CRUD, filtros dinámicos, paginación y ordenamiento con Node.js, Express, MongoDB y Mongoose; gestioné imágenes con Multer y Cloudinary, rediseñé los descuentos e incorporé correos de contacto, validaciones, errores centralizados y protección de endpoints administrativos.',
      imageAlt: 'Plataforma de vehículos Indiana Autos'
    },
    godubi: {
      navigationLabel: 'Godubi',
      title: 'Godubi',
      subtitle: 'Plataforma de trabajo colaborativo · Sep 2023 – Ene 2025',
      description:
        'Desarrollé flujos para una plataforma de trabajo colaborativo, incluyendo actividad, archivos, tareas, calendarios, reuniones y chat en tiempo real. Centralicé el estado en Vuex e implementé integraciones con WebSockets y pagos.',
      imageAlt: 'Panel de la plataforma de trabajo colaborativo Godubi'
    },
    nonighter: {
      navigationLabel: 'NoNighter',
      title: 'NoNighter — Complemento de Excel',
      subtitle: 'Complemento de Excel para modelado financiero · Ene 2025 – Jul 2026',
      description:
        'Desarrollé funcionalidades para un complemento de Microsoft Excel usado en modelado financiero profesional. Construí interfaces con React, Office.js y Fluent UI, integradas con servicios en AWS y DynamoDB, y mejoré la observabilidad con Grafana Faro.',
      imageAlt: 'Vista genérica del complemento de Microsoft Excel de NoNighter'
    },
    portfolio: {
      navigationLabel: 'Mi portfolio',
      title: 'Mi portfolio',
      subtitle: 'Portfolio interactivo para desarrolladores',
      description:
        'Diseñé y desarrollé un portfolio interactivo inspirado en un libro, con navegación animada, diseño responsive y contenido bilingüe. Refactoricé el cambio de páginas en componentes reutilizables y hooks nativos, conservando su identidad visual literaria.',
      imageAlt: 'Portfolio interactivo para desarrolladores inspirado en un libro'
    }
  }
}

export default es
