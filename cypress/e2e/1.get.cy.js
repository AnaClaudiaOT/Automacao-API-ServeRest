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

  it("GET - Busca por todos os usuários", () => {
    cy.request({
      method: "GET",
      url: "/usuarios",
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("getUsuarios")

    // Validações das propriedades
    cy.get("@getUsuarios").then((getResponse) => {
      console.log(getResponse)
      expect(getResponse.status).to.eq(200)
    })
  })

  it("GET - Cadastro e busca de Usuário por ID", () => {
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

    cy.get("@postUsuarios").then((postResponse) => {
      console.log(postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const userId = postResponse.body._id

      // Realiza o GET do usuário cadastrado
      cy.request({
        method: "GET",
        url: `/usuarios/${userId}`,
        failOnStatusCode: false,
      }).as("getUsuarios")

      // Validações das propriedades
      cy.get("@getUsuarios").then((getResponse) => {
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
    const pay = { ...payload, ...postUsuario, nome: "Ana Teste" }

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

    cy.get("@postUsuarios").then((postResponse) => {
      console.log(postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const nome = pay.nome

      // Realiza a busca do usuário cadastrado pelo nome
      cy.request({
        method: "GET",
        url: `https://serverest.dev/usuarios?nome=${nome}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("getUsuarios")

      // Validações das propriedades
      cy.get("@getUsuarios").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        const hasAna = getResponse.body.usuarios.some((user) =>
          user.nome.includes(nome),
        )
        expect(hasAna).to.be.true
      })
    })
  })

  it("GET - Cadastro e busca de usuário por email", () => {
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

    cy.get("@postUsuarios").then((postResponse) => {
      console.log(postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const email = pay.email

      // Realiza a busca do usuário cadastrado pelo email
      cy.request({
        method: "GET",
        url: `https://serverest.dev/usuarios?email=${email}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("getUsuarios")

      // Validações das propriedades
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
      console.log(postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const password = pay.password

      // Realiza a busca do usuário cadastrado pela senha
      cy.request({
        method: "GET",
        url: `https://serverest.dev/usuarios?password=${password}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("getUsuarios")

      // Validações das propriedades
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

  it("GET - Cadastro e busca de usuário por administrador", () => {
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

    cy.get("@postUsuarios").then((postResponse) => {
      console.log(postResponse)
      expect(postResponse.status).to.eq(201)
      expect(postResponse.body.message).to.eq("Cadastro realizado com sucesso")
      expect(postResponse.body).not.empty

      const administrador = pay.administrador

      // Realiza a busca do usuário cadastrado pelo administrador
      cy.request({
        method: "GET",
        url: `https://serverest.dev/usuarios?administrador=${administrador}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("getUsuarios")

      // Validações das propriedades
      cy.get("@getUsuarios").then((getResponse) => {
        console.log(getResponse)
        expect(getResponse.status).to.eq(200)
        const hasAdmin = getResponse.body.usuarios.some((user) =>
          user.administrador.includes(administrador),
        )
        expect(hasAdmin).to.be.true
      })
    })
  })

  it("GET - Usuário não encontrado", () => {
    cy.request({
      method: "GET",
      url: "/usuarios/usuarionaoencontrado",
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("getUsuarios")

    // Validações das propriedades
    cy.get("@getUsuarios").then((getResponse) => {
      console.log(getResponse)
      expect(getResponse.status).to.eq(400)
      expect(getResponse.body.message).to.eq("Usuário não encontrado")
    })
  })
})
