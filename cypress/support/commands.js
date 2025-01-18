// Busca por todos os usuários
Cypress.Commands.add("getUsuarios", (token) => {
  cy.api({
    method: "GET",
    url: "/usuarios",
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((getResponse) => {
    return getResponse
  })
})

// Busca usuário por ID
Cypress.Commands.add("getUsuariosID", (userId, token) => {
  cy.api({
    method: "GET",
    url: `/usuarios/${userId}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((getResponse) => {
    return getResponse
  })
})

// Busca usuário pelo nome
Cypress.Commands.add("getUsuarioNome", (nome, token) => {
  cy.api({
    method: "GET",
    url: `/usuarios?nome=${nome}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((getResponse) => {
    return getResponse
  })
})

// Busca usuário por email
Cypress.Commands.add("getUsuarioEmail", (email, token) => {
  cy.api({
    method: "GET",
    url: `/usuarios?email=${email}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((getResponse) => {
    return getResponse
  })
})

// Busca usuário por senha
Cypress.Commands.add("getUsuarioSenha", (password, token) => {
  cy.api({
    method: "GET",
    url: `/usuarios?password=${password}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((getResponse) => {
    return getResponse
  })
})

// Busca usuário nao encontrado
Cypress.Commands.add("getUsuarioNaoEncontrado", (token) => {
  cy.api({
    method: "GET",
    url: "/usuarios/usuarionaoencontrado",
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((getResponse) => {
    return getResponse
  })
})

// POST - Cadastra um novo usuário
Cypress.Commands.add("postUsuario", (pay, token) => {
  cy.api({
    method: "POST",
    url: "/usuarios/",
    failOnStatusCode: false,
    body: pay,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((postResponse) => {
    return postResponse
  })
})

// PUT - Cadastra um novo usuário
Cypress.Commands.add("putNovoUsuario", (pay, token) => {
  cy.api({
    method: "PUT",
    url: "/usuarios/:_id",
    failOnStatusCode: false,
    body: pay,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((postResponse) => {
    return postResponse
  })
})

// PUT - Atualiza cadastro existente
Cypress.Commands.add("putUsuario", (userId, token, put) => {
  cy.api({
    method: "PUT",
    url: `/usuarios/${userId}`,
    failOnStatusCode: false,
    body: put,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((postResponse) => {
    return postResponse
  })
})

// DELETE - Deleção de usuário
Cypress.Commands.add("deleteUsuario", (userId, token) => {
  cy.api({
    method: "DELETE",
    url: `/usuarios/${userId}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((postResponse) => {
    return postResponse
  })
})
