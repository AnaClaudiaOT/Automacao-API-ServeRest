const payload = require("../fixtures/getUser.json")
const factory = require("../support/factories/post")
const putFactory = require("../support/factories/put")

describe("Validações de Atualização de Usuário", () => {
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

  it("PUT - Cadastro Realizado com Sucesso", () => {
    const putUsuario = putFactory.putUsuario()[0]
    const pay = { ...payload, ...putUsuario }

    // Cadastro de usuário através do PUT
    cy.putNovoUsuario(pay, token).as("putNovoUsuario")

    // Validação Cadastro Realizado com Sucesso
    cy.get("@putNovoUsuario").then((response) => {
      console.log(response)
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq("Cadastro realizado com sucesso")
      expect(response.body).not.empty
    })
  })

  it("PUT - Atualização de Usuário", () => {
    const postUsuario = factory.postUsuario()[0]
    const putUsuario = putFactory.putUsuario()[0]
    const pay = { ...payload, ...postUsuario }

    // Cadastro do usuário
    cy.postUsuario(pay, token).as("postUsuarios")

    // Valida que usuário foi cadastrado
    cy.get("@postUsuarios").then((postResponse) => {
      console.log("POST", postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const userId = postResponse.body._id

      // Log do corpo da requisição PUT
      console.log("PUT Body:", putUsuario)

      // Realiza o PUT para atualizar o usuário cadastrado
      cy.putUsuario(userId, token, putUsuario).as("putUsuario")

      // Valida que registro foi alterado
      cy.get("@putUsuario").then((putResponse) => {
        console.log("PUT", putResponse)
        expect(putResponse.status).to.eq(200)
        expect(putResponse.body.message).to.eq("Registro alterado com sucesso")
      })

      // Realiza o GET para validar os dados atualizados
      cy.getUsuariosID(userId, token).as("getUsuarioAtualizado")

      // Validações das propriedades atualizadas
      cy.get("@getUsuarioAtualizado").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        expect(getResponse.body.nome).to.eq(putUsuario.nome)
        expect(getResponse.body.email).to.eq(putUsuario.email)
        expect(getResponse.body.password).to.eq(putUsuario.password)
        expect(getResponse.body.administrador).to.eq(putUsuario.administrador)
      })
    })
  })

  it("PUT - Validação ao cadastrar um novo usuário reutilizando o e-mail de outro usuário", () => {
    const postUsuario = factory.postUsuario()[0] // Gera os dados do usuário para o POST
    const pay = { ...payload, ...postUsuario }

    // Criação do usuário via POST
    cy.postUsuario(pay, token).as("postUsuarios")

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

      // Cadastro via PUT
      cy.request({
        method: "PUT",
        url: "/usuarios/:_id",
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
        expect(putResponse.body.message).to.eq("Este email já está sendo usado")
      })
    })
  })
})
