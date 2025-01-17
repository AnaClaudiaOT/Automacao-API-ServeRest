const { defineConfig } = require("cypress")

module.exports = defineConfig({
  reporter: "allure-mocha-reporter", // Usando o Allure como reporter
  reporterOptions: {
    reportDir: "cypress/reports/allure", // Diretório onde os relatórios do Allure serão salvos
    overwrite: true, // Sobrescrever relatórios antigos
    html: false, // Não gerar HTML direto aqui, pois o Allure usa uma versão customizada
    json: true, // Gerar arquivo JSON
  },
  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      // Inicializa o plugin do Allure
      require("@shelex/cypress-allure-plugin/plugin")(on, config)
      return config
    },
  },
})
