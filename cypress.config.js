const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on)
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      reportFilename: "mochawesome",
      overwrite: false,
      html: true,
      json: true,
    },
  },
})
