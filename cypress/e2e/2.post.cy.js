const payload = require("../fixtures/getUser.json")
const factory = require("../support/factories/post")

describe("Validações Cadastro de Usuário", () => {
  let token
  const postUsuario = factory.postUsuario()

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
      console.log(response)
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Login realizado com sucesso')

      token = response.body.authorization
    })
  })

  postUsuario.forEach((atributo) => {
    it("POST - Cadastro Realizado com Sucesso", () => {
      const pay = { ...payload, ...atributo }

      cy.request({
        method: "POST",
        url: "/usuarios/",
        failOnStatusCode: false,
        body: pay,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("postUsuarios")

      // Validação Cadastro Realizado com Sucesso
      cy.get("@postUsuarios").then((response) => {
        console.log(response)
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq("Cadastro realizado com sucesso")
        expect(response.body).not.empty
      })
    })
  })

  it("POST - Cadastro com e-mail já existente", () => {
    const existingEmail = postUsuario[0].email // Reutilizando o e-mail do primeiro usuário criado
    const pay = { ...payload, email: existingEmail }

    cy.request({
      method: "POST",
      url: "/usuarios/",
      failOnStatusCode: false,
      body: pay,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("postUsuarios")

    // Validação de e-mail já existente
    cy.get("@postUsuarios").then((response) => {
      console.log(response)
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq("Este email já está sendo usado")
    })
  })

  it("POST - Cadastro com e-mail inválido", () => {
    const invalidEmail = "invalid-email"
    const pay = { ...payload, email: invalidEmail }

    cy.request({
      method: "POST",
      url: "/usuarios/",
      failOnStatusCode: false,
      body: pay,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("postUsuarios")

    // Validação de e-mail inválido
    cy.get("@postUsuarios").then((response) => {
      console.log(response)
      expect(response.status).to.eq(400)
      expect(response.body.email).to.eq("email deve ser um email válido")
    })
  })

  it("POST - Cadastro com senha inválida", () => {
    const invalidPassword = ""
    const pay = { ...payload, password: invalidPassword }

    cy.request({
      method: "POST",
      url: "/usuarios/",
      failOnStatusCode: false,
      body: pay,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("postUsuarios")

    // Validação de senha inválida
    cy.get("@postUsuarios").then((response) => {
      console.log(response)
      expect(response.status).to.eq(400)
      expect(response.body.password).to.eq("password não pode ficar em branco")
    })
  })
})
