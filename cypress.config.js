const { defineConfig } = require("cypress")

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter", // Usando o reporter mochawesome
  reporterOptions: {
    reportDir: "cypress/reports", // Diretório onde os arquivos .json são salvos
    overwrite: false, // Não sobrescrever arquivos existentes
    html: true, // Gerar arquivo HTML
    json: true, // Gerar arquivo JSON
  },
  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on) // Inicializa o plugin
      return config
    },
  },
})
