import puppeteer from 'puppeteer';

describe('e2e test with peppeteer', () => {
  let chromeDriver = {};

  beforeAll(async () => {
    chromeDriver = await puppeteer.launch();
  });

  it('when using chrome, the search keyword would be the title in the page on google.com', async () => {
    const page = await chromeDriver.newPage();
    await page.goto('https://www.google.com/ncr'); // webdriver`
    await page.type('input[name="q"]', 'webdriver');
    await page.keyboard.press('Enter');

    await page.waitForNavigation({ timeout: 2000, waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBe('webdriver - Google Search');
  });
});
