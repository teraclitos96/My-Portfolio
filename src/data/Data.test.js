import i18n from '../i18n';
import { createPortfolioContent } from './Data';
import { BOOK_PAGE_NAVIGATION, BOOK_PAGE_TYPE } from '../utils/book';

describe.each(['en', 'es'])('%s navigation data', (language) => {
  const t = i18n.getFixedT(language, ['common', 'book', 'projects']);
  const content = createPortfolioContent({ t });

  test('opens the projects list and about page', () => {
    expect(content.index[0].destinationSheet).toBe(4);
    expect(content.index[1].destinationSheet).toBe(3);
  });

  test('opens the back page of each project sheet', () => {
    expect(content.projects.map((project) => project.destinationSheet)).toEqual([5, 6, 7, 8, 9]);
  });

  test('keeps the selected projects', () => {
    expect(content.sheets).toHaveLength(10);
    expect(content.projects).toHaveLength(5);
    expect(content.projects[1].id).toBe('indiana-autos');
    expect(content.sheets.every((sheet, index) => sheet.id === `sheet${index + 1}`)).toBe(true);
  });

  test('describes page content without relying on sheet positions', () => {
    const pageTypes = content.sheets.flatMap((sheet) => [
      sheet.frontPage.type,
      sheet.backPage.type,
    ]);

    expect(pageTypes.every(Boolean)).toBe(true);
    expect(content.sheets[2].frontPage.type).toBe(BOOK_PAGE_TYPE.index);
    expect(content.sheets[4].frontPage.type).toBe(BOOK_PAGE_TYPE.projects);
    expect(content.sheets[4].backPage.navigation).toBe(BOOK_PAGE_NAVIGATION.projects);
  });

  test('shares one declarative project between both sides of each spread', () => {
    const projectSpreads = content.projects.map((_, projectIndex) => ({
      overview: content.sheets[projectIndex + 4].backPage.project,
      details: content.sheets[projectIndex + 5].frontPage.project,
    }));

    projectSpreads.forEach(({ overview, details }) => {
      expect(overview).toBe(details);
      expect(overview.image.alt).toBeTruthy();
      expect(overview.importance).toBeGreaterThanOrEqual(1);
      expect(overview.importance).toBeLessThanOrEqual(10);
      expect(overview.technologies.length).toBeGreaterThanOrEqual(3);
      expect(overview.actions.length).toBeGreaterThan(0);
      expect(overview.description.trim().split(/\s+/).length).toBeLessThanOrEqual(90);
      expect(overview.description).not.toMatch(/manually positioned/i);
    });
  });

  test('maps each technology to the most important project that uses it', () => {
    expect(content.technologyNavigation.React).toEqual(
      expect.objectContaining({
        destinationSheet: 8,
        importance: 5,
        projectId: 'nonighter-excel-add-in',
      }),
    );
    expect(content.technologyNavigation['Node.js'].projectId).toBe('indiana-autos');
    expect(content.technologyNavigation['Vue.js'].projectId).toBe('godubi');
  });

  test('only creates destinations for technologies shared by both stacks', () => {
    expect(content.technologyNavigation.JavaScript).toBeUndefined();
    expect(content.technologyNavigation.Express).toBeUndefined();
    expect(Object.keys(content.technologyNavigation)).toHaveLength(13);
  });

  test('does not expose a private Godubi repository', () => {
    const godubi = content.sheets
      .map((sheet) => sheet.backPage.project)
      .find((project) => project?.id === 'godubi');

    expect(godubi.actions.some((action) => action.type === 'github')).toBe(false);
  });

  test('links the Indiana Autos image and action to its website', () => {
    const indiana = content.sheets
      .map((sheet) => sheet.backPage.project)
      .find((project) => project?.id === 'indiana-autos');

    expect(indiana.image.src).toContain('indiana-autos_vadtnl.png');
    expect(indiana.actions).toContainEqual(
      expect.objectContaining({
        href: 'https://indiana.com.ar/',
        type: 'website',
      }),
    );
  });
});
