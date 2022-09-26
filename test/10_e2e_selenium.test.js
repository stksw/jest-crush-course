import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';

jest.setTimeout(10000);

describe('e2e test with selenium', () => {
  let chromeDriver = {};
  let geckoDriver = {};

  beforeAll(async () => {
    const chromeCapabilities = Capabilities.chrome();
    const fireFoxCapabilities = Capabilities.firefox();

    chromeCapabilities.set('goog:chromeOptions', {
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--lang=en-US',
        // '--user-data-dir=./tmp_user_data', // --headlessを外す場合は有効化
      ],
    });

    fireFoxCapabilities.set('moz:firefoxOptions', {
      args: ['-headless'],
    });

    chromeDriver = await new Builder().withCapabilities(chromeCapabilities).build();
    geckoDriver = await new Builder().withCapabilities(fireFoxCapabilities).build();
  });

  afterAll(async () => {
    await chromeDriver.quit();
    await geckoDriver.quit();
  });

  it('When using Chrome, the search keyword would be the title in the page on google.com', async () => {
    await chromeDriver.get('https://google.com/ncr');
    await chromeDriver.findElement(By.name('q')).sendKey('webdriver', Key.RETURN);

    const results = await chromeDriver.wait(until.titleIs('webdriver - Google Search'), 5000);
    expect(results).toBe(true);
  });
});
