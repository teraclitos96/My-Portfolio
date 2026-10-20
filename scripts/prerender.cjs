require('./register-source.cjs')
const fs = require('node:fs')
const path = require('node:path')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { StaticRouter } = require('react-router-dom/server')
const { Helmet } = require('react-helmet')
const { PortfolioRoutes } = require('../src/App.jsx')
const i18n = require('../src/i18n').default
const { projectDefinitions } = require('../src/data/projects')
const { getPagePath, LANGUAGES, SITE_URL } = require('../src/utils/seo')

const output = path.resolve(__dirname, '../build')
const template = fs.readFileSync(path.join(output, 'index.html'), 'utf8')
const pages = LANGUAGES.flatMap((language) => [
  { language, pathname: getPagePath(language) },
  ...projectDefinitions.map(({ id }) => ({ language, pathname: getPagePath(language, id), id }))
])

async function renderPage({ language, pathname }, destination) {
  await i18n.changeLanguage(language)
  const content = renderToString(
    React.createElement(StaticRouter, { location: pathname }, React.createElement(PortfolioRoutes))
  )
  const head = Helmet.renderStatic()
  const html = template
    .replace(/<html[^>]*>/, `<html ${head.htmlAttributes.toString()}>`)
    .replace(/<title>.*?<\/title>/, '')
    .replace('</head>', `${head.title}${head.meta}${head.link}${head.script}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.writeFileSync(destination, html)
}

async function main() {
  for (const page of pages) {
    await renderPage(page, path.join(output, page.pathname, 'index.html'))
  }
  await renderPage({ language: 'en', pathname: '/' }, path.join(output, 'index.html'))
  for (const language of LANGUAGES) {
    await renderPage(
      { language, pathname: `/${language}/not-found` },
      path.join(output, language, '404.html')
    )
  }
  await renderPage({ language: 'en', pathname: '/404' }, path.join(output, '404.html'))
  const entries = pages
    .map(({ language, pathname, id }) => {
      const alternates = LANGUAGES.map(
        (lng) =>
          `<xhtml:link rel="alternate" hreflang="${lng}" href="${SITE_URL}${getPagePath(lng, id)}"/>`
      ).join('')
      return `<url><loc>${SITE_URL}${pathname}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${getPagePath('en', id)}"/></url>`
    })
    .join('')
  fs.writeFileSync(
    path.join(output, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`
  )
  console.log(`Prerendered ${pages.length} localized pages, the legacy home and the 404 page.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
