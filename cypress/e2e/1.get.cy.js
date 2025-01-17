const payload = require("../fixtures/getUser.json")
const factory = require("../support/factories/post")

describe("Validações Busca de Usuários", () => {
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

  it("GET - Busca por todos os usuários", () => {
    cy.getUsuarios(token).as("getUsuarios")

    // Validações
    cy.get("@getUsuarios").then((getResponse) => {
      console.log(getResponse)
      expect(getResponse.status).to.eq(200)
    })
  })

  it("GET - Cadastro e busca de Usuário por ID", () => {
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

      // Realiza o GET do usuário cadastrado
      cy.getUsuariosID(userId, token).as("getUsuariosID")

      // Validações das propriedades
      cy.get("@getUsuariosID").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        expect(getResponse.body.email).to.eq(pay.email)
        expect(getResponse.body.nome).to.eq(pay.nome)
        expect(getResponse.body._id).to.eq(userId)
        expect(getResponse.body).not.empty
      })
    })
  })

  it("GET - Cadastro e busca de usuário por nome", () => {
    const postUsuario = factory.postUsuario()[0]
    const payNome = { ...payload, ...postUsuario, nome: "Ana Teste" }
    // Cadastro do usuário
    cy.postUsuario(payNome, token).as("postUsuarios")

    // Valida que usuário foi cadastrado
    cy.get("@postUsuarios").then((postResponse) => {
      console.log(postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const nome = payNome.nome

      // Realiza a busca do usuário cadastrado pelo nome
      cy.getUsuarioNome(nome, token).as("getUsuarios")

      // Validações a busca do usuário pelo nome
      cy.get("@getUsuarios").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        const hasNome = getResponse.body.usuarios.some((user) =>
          user.nome.includes(nome),
        )
        expect(hasNome).to.be.true
      })
    })
  })

  it("GET - Cadastro e busca de usuário por email", () => {
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

      const email = pay.email

      // Realiza a busca do usuário cadastrado pelo email
      cy.getUsuarioEmail(email, token).as("getUsuarios")

      // Validações a busca do usuário pelo e-mail
      cy.get("@getUsuarios").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        const hasEmail = getResponse.body.usuarios.some((user) =>
          user.email.includes(email),
        )
        expect(hasEmail).to.be.true
      })
    })
  })

  it("GET - Cadastro e busca de usuário por senha", () => {
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

      const password = pay.password

      // Realiza a busca do usuário cadastrado pela senha
      cy.getUsuarioSenha(password, token).as("getUsuarios")

      // Validações a busca do usuário por senha
      cy.get("@getUsuarios").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        const hasPassword = getResponse.body.usuarios.some((user) =>
          user.password.includes(password),
        )
        expect(hasPassword).to.be.true
      })
    })
  })

  it("GET - Busca por usuário inexistente", () => {
    cy.getUsuarioNaoEncontrado(token).as("getUsuarios")

    // Validações das propriedades
    cy.get("@getUsuarios").then((getResponse) => {
      console.log(getResponse)
      expect(getResponse.status).to.eq(400)
      expect(getResponse.body.message).to.eq("Usuário não encontrado")
    })
  })
})
