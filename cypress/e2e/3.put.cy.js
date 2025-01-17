import { faker } from "@faker-js/faker"

const payload = require("../fixtures/getUser.json")
const factory = require("../support/factories/post")
const putFactory = require("../support/factories/put")

describe("Validações de Atualização de Usuário", () => {
  let token

  const putUsuario = putFactory.putUsuario()

  before(() => {
    // Realiza o login e obtém o token JWT
    cy.request({
      method: "POST",
      url: "/login",
      body: {
        email: "teste@teste.com",
        password: "teste123",
      },
    }).then((response) => {
      console.log("POST JWT", response)
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq("Login realizado com sucesso")

      token = response.body.authorization
    })
  })

  putUsuario.forEach((atributo) => {
    it("PUT - Cadastro Realizado com Sucesso", () => {
      const pay = { ...payload, ...atributo }

      cy.request({
        method: "PUT",
        url: "/usuarios/:_id",
        failOnStatusCode: false,
        body: pay,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("putUsuarios")

      // Validação Cadastro Realizado com Sucesso
      cy.get("@putUsuarios").then((response) => {
        console.log(response)
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq("Cadastro realizado com sucesso")
        expect(response.body).not.empty
      })
    })
  })

  it("PUT - Atualização de Usuário", () => {
    const postUsuario = factory.postUsuario()[0]
    const putUsuario = putFactory.putUsuario()[0]
    const pay = { ...payload, ...postUsuario }
    const put = { ...putUsuario } // Corrigido para não incluir payload novamente

    // Log do corpo da requisição POST
    console.log("POST Body:", pay)

    // Cadastro do usuário
    cy.request({
      method: "POST",
      url: "/usuarios/",
      failOnStatusCode: false,
      body: pay,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("postUsuarios")

    // Validação de cadastro de usuário
    cy.get("@postUsuarios").then((postResponse) => {
      console.log("POST", postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const userId = postResponse.body._id

      // Log do corpo da requisição PUT
      console.log("PUT Body:", put)

      // Realiza o PUT para atualizar o usuário cadastrado
      cy.request({
        method: "PUT",
        url: `/usuarios/${userId}`,
        failOnStatusCode: false,
        body: put,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("putUsuario")

      // Validações das propriedades
      cy.get("@putUsuario").then((putResponse) => {
        console.log("PUT", putResponse)
        expect(putResponse.status).to.eq(200)
        expect(putResponse.body.message).to.eq("Registro alterado com sucesso")
      })

      // Realiza o GET para validar os dados atualizados
      cy.request({
        method: "GET",
        url: `/usuarios/${userId}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("getUsuarioAtualizado")

      // Validações das propriedades atualizadas
      cy.get("@getUsuarioAtualizado").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        expect(getResponse.body.nome).to.eq(put.nome)
        expect(getResponse.body.email).to.eq(put.email)
        expect(getResponse.body.password).to.eq(put.password)
        expect(getResponse.body.administrador).to.eq(put.administrador)
      })
    })
  })

  it("PUT - Validação ao cadastrar um novo usuário reutilizando o e-mail de outro usuário", () => {
    const postUsuario = factory.postUsuario()[0] // Gera os dados do usuário para o POST
    const pay = { ...payload, ...postUsuario }

    // Criação do usuário via POST
    cy.request({
      method: "POST",
      url: "/usuarios/",
      failOnStatusCode: false,
      body: pay,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("postUsuarios")

    cy.get("@postUsuarios").then((postResponse) => {
      console.log("POST", postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      // Recupera o e-mail diretamente do payload
      const emailRecuperado = pay.email
      console.log("E-mail recuperado:", emailRecuperado)

      // Novo payload para o PUT
      const putPayload = {
        nome: "Novo Usuário",
        email: emailRecuperado,
        password: "senha123",
        administrador: "true",
      }

      console.log("PUT Payload:", putPayload)

      // Tentativa de cadastro via PUT
      cy.request({
        method: "PUT",
        url: "/usuarios/:_id", // Substitua :_id pelo ID correto se necessário
        failOnStatusCode: false,
        body: putPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("putUsuario")

      // Validação da resposta do PUT
      cy.get("@putUsuario").then((putResponse) => {
        console.log("PUT LOG", putResponse)
        expect(putResponse.status).to.eq(400) // Espera erro por reutilizar o mesmo e-mail
        expect(putResponse.body.message).to.eq("Este email já está sendo usado") // Ajuste conforme a mensagem esperada
      })
    })
  })
})
