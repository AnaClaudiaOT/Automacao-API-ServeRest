# Desafio de Automação de Testes de API

Este projeto visa garantir a qualidade de uma API de gerenciamento de usuários, automatizando testes para os principais endpoints da API. Foi utilizado o Cypress como framework de testes e o Mocha para geração de relatórios detalhados. Os resultados são integrados ao GitHub Actions para automação contínua (CI/CD).  

Relatórios são disponibilizados visualmente via GitHub Pages, permitindo o acompanhamento em tempo real do status dos testes.

---

## Índice
1. Contexto
2. Configuração do Ambiente
3. Execução dos Testes
4. Testes Implementados
5. Geração de Relatórios

---

## Contexto

Este projeto cobre os seguintes casos de uso:
- Garantir que os principais endpoints da API sejam testados.
- Validar cenários positivos e negativos.
- Integrar os testes à pipeline de CI/CD para execução contínua.
- Geração de Relátorio de Execução
- Autenticação via JWT Token

  As informações para a implementação dos testes foram baseadas na [API Serverest](https://serverest.dev/), que fornece uma estrutura RESTful para gerenciamento de usuários, incluindo operações de criação, leitura, atualização e exclusão de usuários.

---

## Configuração do Ambiente

### Requisitos
- **Node.js:**
[Baixar Node.js](https://nodejs.org/download/release/v23.6.0/node-v23.6.0-x64.msi)
    - **Versão do Node utilizada:** `23.5` 

- **Git:**
[Baixar Git](https://git-scm.com/downloads)

- **Visual Studio Code:**
[Baixar Visual Studio Code](https://code.visualstudio.com/download)

  Vídeo para instalação: https://www.youtube.com/watch?v=FWnZBah0WLc


## Execução dos Testes

  [Link do repositório](https://github.com/AnaClaudiaOT/desafioBancoCarrefour.git)

#### Download do projeto
1.	Crie uma pasta no local de sua preferência.
2.	Clique com o botão direito do mouse dentro da pasta e selecione a opção Open Git Bash here		
3.	Adicione o comando a seguir no Git Bash: git clone https://github.com/AnaClaudiaOT/desafioBancoCarrefour.git
4.	Abra o VS Code (Visual Studio Code)
5.	Abra o menu File (Arquivo) no Vs Code e clique em Open Folder (Abrir Pasta)
6.	Encontre a pasta criada anteriormente e selecione
7.	Clique com o botão direito em cima do nome do projeto e clique em Open in Integrated Terminal (Abrir terminal)

### Instalação de dependências 
1.	Digite o comando a seguir no terminal aberto: npm install

Execução do projeto através do Cypress no modo Interativo
1.	Para rodar o projeto via tela interativa, digite o comando no terminal: npm run test:interativo
2.	Selecione a opção E2E Testing
3.	Selecione o navegador e clique em Start E2E Testing in...:
4.	Selecionar o cenário desejado para rodar: 

Execução do projeto modo headless: 
1.	Para rodar o projeto via tela interativa, digite o comando no terminal: npm run test:headless
2.	Aguarde todos os cenários serem executados
3.	O comando irá garantir que os testes sejam executados de forma mais rápida que o modo Interativo e irá exibir o Relatório de Execução ao final da execução


## Testes Implementados

#### Método GET  
- GET - Busca por todos os usuários  
- GET - Cadastro e busca de Usuário por ID  
- GET - Cadastro e busca de usuário por nome  
- GET - Cadastro e busca de usuário por email  
- GET - Cadastro e busca de usuário por senha  
- GET - Busca por usuário inexistente  

#### Método POST  
- POST - Cadastro Novo Usuário  
- POST - Cadastro com e-mail já existente  
- POST - Cadastro com e-mail inválido  
- POST - Cadastro com senha inválida  

#### Método PUT  
- PUT - Cadastro Novo Usuário  
- PUT - Atualização de Usuário  
- PUT - Validação ao cadastrar um novo usuário reutilizando o e-mail de outro usuário  

#### Método DELETE  
- DELETE - Cadastro e deleção de Usuário por ID  
- DELETE - Validação de deleção de usuário com carrinho cadastrado  


## Geração de Relatórios
Os relatórios de execução são gerados localmente após a execução dos testes e exibidos no navegador.

Sempre que uma modificação é feita no projeto e o código é enviado para o repositório no GitHub (via `git push`), a pipeline do **GitHub Actions** é automaticamente acionada. Isso garante que os testes sejam executados de forma contínua, validando as alterações feitas no código. Após a execução dos testes, o relatório é gerado automaticamente através do **GitHub Pages** e pode ser visualizado após a conclusão da pipeline.

### Acessando o Histórico de Execuções no GitHub Actions
Para acessar o histórico completo das execuções realizadas pela pipeline do GitHub Actions, clique no seguinte link:  
[GitHub Actions - Histórico de Execuções](https://github.com/AnaClaudiaOT/desafioBancoCarrefour/actions)  
Aqui você encontrará todos os registros de execução dos testes.

### Acessando o Relatório Gerado
Após a execução da pipeline, o relatório estará disponível via **GitHub Pages**. Para acessá-lo, basta clicar no seguinte link:  
[Relatório de Execução - GitHub Pages](https://anaclaudiaot.github.io/desafioBancoCarrefour/)  
No relatório, você poderá acompanhar todos os detalhes dos testes realizados e analisar os resultados de forma visual e acessível.

