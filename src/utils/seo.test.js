import i18n from '../i18n'
import { createProjects } from '../data/projects'
import { getPageMetadata, getPagePath, SITE_URL } from './seo'
import { getImageSources, optimizeImage } from './images'

describe('localized portfolio URLs and metadata', () => {
  test.each(['en', 'es'])('keeps %s metadata and links on the same language URL', (language) => {
    const t = i18n.getFixedT(language, ['common', 'book', 'projects'])
    const projects = createProjects({ t })
    const home = getPageMetadata({ language })
    expect(home.url).toBe(`${SITE_URL}/${language}/`)
    expect(home.description).toContain(language === 'es' ? 'desarrollador' : 'developer')
    projects.forEach((project) => {
      const meta = getPageMetadata({ language, project })
      expect(meta.url).toBe(`${SITE_URL}/${language}/projects/${project.id}/`)
      expect(meta.title).toContain(project.title)
      expect(meta.description).toContain(project.description.slice(0, 40))
      expect(meta.description.length).toBeLessThanOrEqual(160)
      expect(meta.url).not.toBe(home.url)
    })
  })

  test('switches language without dropping the selected project', () => {
    expect(getPagePath('es', 'indiana-autos')).toBe('/es/projects/indiana-autos/')
    expect(getPagePath('en', 'indiana-autos')).toBe('/en/projects/indiana-autos/')
  })
})

describe('optimized images', () => {
  test('caps Cloudinary resolution and negotiates quality and format', () => {
    const original = 'https://res.cloudinary.com/example/image/upload/v123/project.png'
    expect(optimizeImage(original)).toBe(
      'https://res.cloudinary.com/example/image/upload/f_auto,q_auto,c_limit,w_640/v123/project.png'
    )
    expect(getImageSources(original)).toContain('w_320/v123/project.png 320w')
    expect(getImageSources(original)).toContain('w_960/v123/project.png 960w')
    expect(getImageSources(original, 564)).toContain('w_564/v123/project.png 564w')
    expect(getImageSources(original, 564)).not.toContain('640w')
  })

  test('leaves local SVGs and other hosts intact', () => {
    expect(optimizeImage('/images/nonighter-placeholder.svg')).toBe(
      '/images/nonighter-placeholder.svg'
    )
    expect(getImageSources('/images/nonighter-placeholder.svg')).toBeUndefined()
    expect(optimizeImage('https://example.com/a.png')).toBe('https://example.com/a.png')
  })
})
