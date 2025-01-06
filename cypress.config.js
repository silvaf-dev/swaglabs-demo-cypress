const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 1,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    chromeWebSecurity: true,
    setupNodeEvents(on, config) {
    },
  },
});
