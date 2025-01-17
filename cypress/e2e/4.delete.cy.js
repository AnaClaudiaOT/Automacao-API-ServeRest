const payload = require("../fixtures/getUser.json")
const factory = require("../support/factories/post")

describe("Validações Busca de Ssuários", () => {
  let token

  beforeEach(() => {
    // Cadastrar um usuário novo
    const postUsuario = factory.postUsuario()[0]
    const pay = { ...payload, ...postUsuario }

    cy.postUsuario(pay, token)
      .as("postUsuarios")
      .then((postResponse) => {
        console.log("POST LOGIN", postResponse)
        expect(postResponse.status).to.eq(201)
        expect(postResponse.body.message).to.eq(
          "Cadastro realizado com sucesso",
        )

        // Login com o usuário cadastrado
        cy.request({
          method: "POST",
          url: "/login",
          body: {
            email: postUsuario.email,
            password: postUsuario.password,
          },
        }).then((loginResponse) => {
          console.log("POST Login", loginResponse)
          expect(loginResponse.status).to.eq(200)
          expect(loginResponse.body.message).to.eq(
            "Login realizado com sucesso",
          )

          token = loginResponse.body.authorization

          // Chamar cy.getUsuarios() após obter o token
          cy.getUsuarios(token)
        })
      })
  })

  it("DELETE - Cadastro e deleção de Usuário por ID", () => {
    const postUsuario = factory.postUsuario()[0]
    const pay = { ...payload, ...postUsuario }

    // Cadastro do usuário
    cy.postUsuario(pay, token).as("postUsuarios")

    // Valida que usuário foi cadastrado
    cy.get("@postUsuarios").then((postResponse) => {
      console.log(postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const userId = postResponse.body._id

      // Realiza o DELETE do usuário cadastrado
      cy.deleteUsuario(userId, token).as("deleteUsuario")

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
