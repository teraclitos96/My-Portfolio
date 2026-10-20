import { Helmet } from 'react-helmet'
import { getPageMetadata, getPagePath, LANGUAGES, SITE_URL } from '../utils/seo'

const Seo = ({ language, project }) => {
  const { title, description, url } = getPageMetadata({ language, project })
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Francisco Terán',
    url: `${SITE_URL}${getPagePath(language)}`,
    jobTitle: language === 'es' ? 'Desarrollador Full-Stack' : 'Full-Stack Developer',
    sameAs: ['https://github.com/teraclitos', 'https://www.linkedin.com/in/francisco-teran/'],
    knowsAbout: [
      'React',
      'Node.js',
      'Vue.js',
      'Microsoft Excel Add-ins',
      'Office.js',
      'AWS',
      'MongoDB'
    ]
  }
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': project ? 'CreativeWork' : 'WebPage',
        '@id': url,
        url,
        name: title,
        description,
        inLanguage: language,
        author: { '@id': person['@id'] }
      }
    ]
  }

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index, follow, max-image-preview:large' />
      <link rel='canonical' href={url} />
      {LANGUAGES.map((alternate) => (
        <link
          key={alternate}
          rel='alternate'
          hrefLang={alternate}
          href={`${SITE_URL}${getPagePath(alternate, project?.id)}`}
        />
      ))}
      <link
        rel='alternate'
        hrefLang='x-default'
        href={`${SITE_URL}${getPagePath('en', project?.id)}`}
      />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Francisco Terán — Portfolio' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:locale' content={language === 'es' ? 'es_AR' : 'en_US'} />
      <meta property='og:locale:alternate' content={language === 'es' ? 'en_US' : 'es_AR'} />
      <meta property='og:image' content={`${SITE_URL}/og.jpg`} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content={title} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={`${SITE_URL}/og.jpg`} />
      <meta name='twitter:image:alt' content={title} />
      <script type='application/ld+json'>
        {JSON.stringify(structuredData).replace(/</g, '\\u003c')}
      </script>
    </Helmet>
  )
}

export default Seo
