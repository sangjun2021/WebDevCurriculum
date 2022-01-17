// See https://github.com/smooth-code/jest-puppeteer for more information about these options
module.exports = {
  launch: {
    dumpio: true,
    headless: 'false',
    product: 'chrome',
    slowMo: 10,
  },
  server: {
    command: 'npm run serve',
    port: 8080,
    launchTimeout: 100000,
  },
};
