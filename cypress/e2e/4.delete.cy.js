const payload = require("../fixtures/getUser.json")
const factory = require("../support/factories/post")

describe("Validações Busca de Ssuários", () => {
  let token

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
      expect(response.body.message).to.eq("Login realizado com sucesso")

      token = response.body.authorization
    })
  })

  it("DELETE - Cadastro e deleção de Usuário por ID", () => {
    const postUsuario = factory.postUsuario()[0]
    const pay = { ...payload, ...postUsuario }

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
      console.log(postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const userId = postResponse.body._id

      // Realiza o DELETE do usuário cadastrado
      cy.request({
        method: "DELETE",
        url: `/usuarios/${userId}`,
        failOnStatusCode: false,
      }).as("deleteUsuario")

      // Validações das propriedades
      cy.get("@deleteUsuario").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        expect(getResponse.body.message).to.eq("Registro excluído com sucesso")
      })
    })
  })

  it("DELETE - Validação de deleção de usuário com carrinho cadastrado", () => {
    // Faz a requisição para obter os carrinhos
    cy.request({
      method: "GET",
      url: "/carrinhos",
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("getCarrinhos")

    cy.get("@getCarrinhos").then((getResponse) => {
      console.log(getResponse)
      expect(getResponse.status).to.eq(200)
      expect(getResponse.body).to.have.property("carrinhos")
      expect(getResponse.body.carrinhos).to.be.an("array").that.is.not.empty

      // Extrai o idUsuario do primeiro carrinho
      const idUsuario = getResponse.body.carrinhos[0].idUsuario

      // Tenta deletar o usuário com o idUsuario extraído
      cy.request({
        method: "DELETE",
        url: `/usuarios/${idUsuario}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("deleteUsuario")

      // Valida a resposta de erro 400
      cy.get("@deleteUsuario").then((deleteResponse) => {
        console.log(deleteResponse)
        expect(deleteResponse.status).to.eq(400)
        expect(deleteResponse.body.message).to.eq(
          "Não é permitido excluir usuário com carrinho cadastrado",
        )
      })
    })
  })
})
