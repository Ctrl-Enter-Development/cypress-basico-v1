const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'psk62b',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
