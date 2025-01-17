const payload = require("../fixtures/getUser.json")
const factory = require("../support/factories/post")

describe("Validações Cadastro de Usuário", () => {
  let token
  const postUsuario = factory.postUsuario()

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

  postUsuario.forEach((atributo) => {
    it("POST - Cadastro Realizado com Sucesso", () => {
      const pay = { ...payload, ...atributo }

      // Cadastro do usuário
      cy.postUsuario(pay, token).as("postUsuarios")

     // Valida que usuário foi cadastrado
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

    // Cadastro do usuário
    cy.postUsuario(pay, token).as("postUsuarios")

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

    // Cadastro do usuário
    cy.postUsuario(pay, token).as("postUsuarios")

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

    // Cadastro do usuário
    cy.postUsuario(pay, token).as("postUsuarios")

    // Validação de senha inválida
    cy.get("@postUsuarios").then((response) => {
      console.log(response)
      expect(response.status).to.eq(400)
      expect(response.body.password).to.eq("password não pode ficar em branco")
    })
  })
})
