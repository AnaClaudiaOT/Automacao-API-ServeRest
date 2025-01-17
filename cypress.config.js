const { defineConfig } = require("cypress")

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",  // Direciona os arquivos de relatório para esse diretório
    overwrite: true,               // Substitui os arquivos existentes
    html: true,                    // Gera o arquivo HTML
    json: true,                    // Gera o arquivo JSON
    mochaFile: "cypress/reports/results-[hash].json", // Arquivo JSON único para cada execução
  },
  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on)
      return config
    },
  },
})
