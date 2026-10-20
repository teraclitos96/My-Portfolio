require('./register-source.cjs')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { projectDefinitions } = require('../src/data/projects')
const { getPagePath, LANGUAGES, SITE_URL } = require('../src/utils/seo')
const config = require('../vercel.json')
const output = path.resolve(__dirname, '../build')
const sitemap = fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8')
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

for (const language of LANGUAGES) {
  const error = fs.readFileSync(path.join(output, language, '404.html'), 'utf8')
  assert.match(error, new RegExp(`<html[^>]*lang="${language}"`))
  assert.match(error, /name="robots" content="noindex, follow"/)
  for (const project of [undefined, ...projectDefinitions]) {
    const pathname = getPagePath(language, project?.id)
    const html = fs.readFileSync(path.join(output, pathname, 'index.html'), 'utf8')
    assert.match(html, new RegExp(`<html[^>]*lang="${language}"`))
    assert.match(
      html,
      new RegExp(`<link[^>]*rel="canonical"[^>]*href="${escape(SITE_URL + pathname)}"`)
    )
    assert.equal((html.match(/name="description"/g) || []).length, 1)
    assert.equal((html.match(/name="robots"/g) || []).length, 1)
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    assert.equal((html.match(/rel="alternate"/g) || []).length, 3)
    assert.match(html, /<div id="root"><.+/)
    assert.match(html, /<article/)
    if (project) {
      assert.match(html, new RegExp(`id="${project.id}-title"`))
      const index = projectDefinitions.indexOf(project) + 5
      assert.equal((html.match(/rotateY\(-180deg\)/g) || []).length, index)
    }
    const schema = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)
    assert(schema, `Missing structured data: ${pathname}`)
    assert.equal(JSON.parse(schema[1])['@graph'][1].inLanguage, language)
    const route = config.routes.find((item) => item.src && new RegExp(item.src).test(pathname))
    assert(route?.dest, `Missing Vercel route: ${pathname}`)
    assert.equal(pathname.replace(new RegExp(route.src), route.dest), `${pathname}index.html`)
    assert(sitemap.includes(`<loc>${SITE_URL}${pathname}</loc>`))
  }
}
assert.equal((sitemap.match(/<loc>/g) || []).length, 12)
assert.match(
  fs.readFileSync(path.join(output, '404.html'), 'utf8'),
  /name="robots" content="noindex, follow"/
)
assert.equal(config.routes.at(-1).status, 404)
assert.equal(config.routes[0].status, 308)
console.log(
  'Verified 12 HTML pages: language, canonical, metadata, schema, sitemap, initial book spread and server routes.'
)
