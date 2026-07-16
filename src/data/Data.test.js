import { portfolioContentByLanguage } from './Data'
import { BOOK_PAGE_NAVIGATION, BOOK_PAGE_TYPE } from '../utils/book'

describe.each(['english', 'spanish'])('%s navigation data', language => {
  const content = portfolioContentByLanguage[language]

  test('opens the projects list and about page', () => {
    expect(content.index[0].destinationSheet).toBe(4)
    expect(content.index[1].destinationSheet).toBe(3)
  })

  test('opens the back page of each project sheet', () => {
    expect(content.projects.map(project => project.destinationSheet)).toEqual([
      5, 6, 7, 8, 9
    ])
  })

  test('keeps the selected projects', () => {
    expect(content.pages).toHaveLength(10)
    expect(content.projects).toHaveLength(5)
    expect(content.projects[1].id).toBe('indiana-autos')
  })

  test('describes page content without relying on sheet positions', () => {
    const pageTypes = content.pages.flatMap(page => [
      page.frontPage.type,
      page.backPage.type
    ])

    expect(pageTypes.every(Boolean)).toBe(true)
    expect(content.pages[2].frontPage.type).toBe(BOOK_PAGE_TYPE.index)
    expect(content.pages[4].frontPage.type).toBe(BOOK_PAGE_TYPE.projects)
    expect(content.pages[4].backPage.navigation).toBe(BOOK_PAGE_NAVIGATION.projects)
  })

  test('shares one declarative project between both sides of each spread', () => {
    const projectSpreads = content.projects.map((_, projectIndex) => ({
      overview: content.pages[projectIndex + 4].backPage.project,
      details: content.pages[projectIndex + 5].frontPage.project
    }))

    projectSpreads.forEach(({ overview, details }) => {
      expect(overview).toBe(details)
      expect(overview.image.alt).toBeTruthy()
      expect(overview.technologies.length).toBeGreaterThanOrEqual(3)
      expect(overview.technologies.length).toBeLessThanOrEqual(6)
      expect(overview.actions.length).toBeGreaterThan(0)
      expect(overview.description.trim().split(/\s+/).length).toBeLessThanOrEqual(90)
      expect(overview.description).not.toMatch(/manually positioned/i)
    })
  })

  test('does not expose a private Godubi repository', () => {
    const godubi = content.pages
      .map(page => page.backPage.project)
      .find(project => project?.id === 'godubi')

    expect(godubi.actions.some(action => action.type === 'github')).toBe(false)
  })

  test('links the Indiana Autos image and action to its website', () => {
    const indiana = content.pages
      .map(page => page.backPage.project)
      .find(project => project?.id === 'indiana-autos')

    expect(indiana.image.src).toContain('indiana-autos_vadtnl.png')
    expect(indiana.actions).toContainEqual(expect.objectContaining({
      href: 'https://indiana.com.ar/',
      type: 'website'
    }))
  })
})
