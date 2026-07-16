import { portfolioContentByLanguage } from './Data'

describe.each(['english', 'spanish'])('%s navigation data', language => {
  const content = portfolioContentByLanguage[language]

  test('opens the projects list and about page', () => {
    expect(content.index[0].destinationPage).toBe(4)
    expect(content.index[1].destinationPage).toBe(3)
  })

  test('opens the back page of each project sheet', () => {
    expect(content.projects.map(project => project.destinationPage)).toEqual([
      5, 6, 7, 8
    ])
  })

  test('keeps the selected projects', () => {
    expect(content.pages).toHaveLength(9)
    expect(content.projects).toHaveLength(4)
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
})
