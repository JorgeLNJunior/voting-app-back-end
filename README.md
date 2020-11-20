<div align="center">
  <img src="https://i.imgur.com/cldg8Ie.png"></img>
</div>

<div align="center">

Aplicação de enquetes feita com base no [Voting App](https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Voting-App.md)
do repositório [App Ideas](https://github.com/florinpop17/app-ideas).

</div>

<div align="center">

[![Travis Build](https://travis-ci.com/JorgeLNJunior/voting-app-back-end.svg?branch=master)](https://travis-ci.com/github/JorgeLNJunior/voting-app-back-end)
[![Coverage Status](https://coveralls.io/repos/github/JorgeLNJunior/voting-app-back-end/badge.svg?branch=master&service=github)](https://coveralls.io/github/JorgeLNJunior/voting-app-back-end?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/github/license/JorgeLNJunior/voting-app-back-end)](https://github.com/JorgeLNJunior/voting-app-back-end/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/v/release/JorgeLNJunior/voting-app-back-end?color=lgreen)](https://github.com/JorgeLNJunior/voting-app-back-end/releases)

</div>

<div align="center">

[Frontend](https://github.com/JorgeLNJunior/voting-app-front-end/) · [Backend](https://github.com/JorgeLNJunior/voting-app-back-end/)

<a href="api-voting-app.herokuapp.com" target="_blank"><strong>API »</strong></a>

</div>

## Tabela de Conteúdos
* [Sobre o Projeto](https://github.com/JorgeLNJunior/voting-app-back-end#sobre-o-projeto)
* [Rotas](https://github.com/JorgeLNJunior/voting-app-back-end#rotas)
* [Tecnologias](https://github.com/JorgeLNJunior/voting-app-back-end#tecnologias)
* [Instalação e configuração](https://github.com/JorgeLNJunior/voting-app-back-end#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
  * [Requisitos](https://github.com/JorgeLNJunior/voting-app-back-end#requisitos)
  * [Opcional](https://github.com/JorgeLNJunior/voting-app-back-end#requisitos)
  * [Instalação](https://github.com/JorgeLNJunior/voting-app-back-end#instala%C3%A7%C3%A3o)
* [CheckList](https://github.com/JorgeLNJunior/voting-app-back-end#checklist)
  * [User stories](https://github.com/JorgeLNJunior/voting-app-back-end#user-stories)
  * [Bônus Features](https://github.com/JorgeLNJunior/voting-app-back-end#bonus-features)
* [Licença](https://github.com/JorgeLNJunior/voting-app-back-end#licen%C3%A7a)

## Sobre o Projeto
Aplicação de enquetes onde é possível criar, compartilhar e gerenciar enquetes.
Feita com base no
<a href="https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Voting-App.md" target="_blank"><strong>Voting App »</strong></a>
do repositório
<a href="https://github.com/florinpop17/app-ideas" target="_blank"><strong>App Ideas »</strong></a>
com o propósito de praticar e aprender tecnologias como Jest, TDD, CI/CD, criação de API's REST, Azure, Knex.js, entre outros.
Para mais informações como diagramas, planejamento e futuras funcionalidades visite o
<a href="https://trello.com/b/YacYdWhy/voting-app" target="_blank"><strong>quadro Trello »</strong></a>
deste projeto.


## Rotas

Informações básicas sobre as rotas da aplicação, para informações mais detalhadas visite a <a href="api-voting-app.herokuapp.com/docs" target="_blank"><strong>documentação da API »</strong></a>
| HTTP   | Rota                             | Descrição                    | Autenticação |
|--------|----------------------------------|------------------------------|--------------|
| POST   | /register                        | registra um novo usuário     | não          |
| POST   | /login                           | autentica um usuário         | não          |
| GET    | /users/?                         | lista um ou mais usuários    | sim          |
| GET    | /users/:id/votes                 | lista os votos de um usuário | sim          |
| POST   | /users/:id/password              | altera a senha do usuário    | sim          |
| POST   | /users/:id/avatar                | altera o avatar do usuário   | sim          |
| PUT    | /users/:id                       | edita um usuário             | sim          |
| DELETE | /users/:id                       | deleta um usuário            | sim          |
| POST   | /surveys                         | cria uma survey              | sim          |
| GET    | /surveys/?                       | lista uma ou mais surveys    | não          |
| POST   | /suveys/:surveyID/vote/:optionID | vota em uma opção            | sim          |
| PUT    | /surveys/:surveyID               | edita uma survey             | sim          |
| DELETE | /surveys/:surveyID               | deleta uma survey            | sim          |
| POST   | /surveys/:id/banner              | altera o banner da survey    | sim          |
| GET    | /docs                            | acessa a documentação da API | não          |

## Tecnologias
Este projeto foi contruído com as seguintes tecnologias:
- <a href="https://nodejs.org" target="_blank"><strong>Node.js »</strong></a>
- <a href="https://expressjs.com" target="_blank"><strong>Express.js »</strong></a>
- <a href="http://knexjs.org" target="_blank"><strong>Knex.js »</strong></a>
- <a href="https://www.mysql.com" target="_blank"><strong>MySQL »</strong></a>
- <a href="https://www.mongodb.com" target="_blank"><strong>MongoDB »</strong></a>
- <a href="http://shorturl.at/jCJV2" target="_blank"><strong>Azure Storage »</strong></a>
- <a href="https://jestjs.io" target="_blank"><strong>Jest »</strong></a>
- <a href="https://travis-ci.org" target="_blank"><strong>Travis CI »</strong></a>
- <a href="https://www.heroku.com" target="_blank"><strong>Heroku »</strong></a>

## Instalação e configuração
### Requisitos
  - <a href="https://nodejs.org/en/download/" target="_blank"><strong>Node.js »</strong></a> na sua versão 12.x
  - Um banco de dados <a href="https://dev.mysql.com/downloads/" target="_blank"><strong>MySQL »</strong></a> na sua versão 5.7

### Opcional
  - Um banco de dados <a href="https://www.mongodb.com/try/download/community" target="_blank"><strong>MongoDB »</strong></a> para os logs
  - Uma <a href="https://azure.microsoft.com/en-us/services/storage/" target="_blank"><strong>Azure Storage Account »</strong></a> para upload dos avatares e banners

### Instalação
  1. Clone o projeto: `git clone https://github.com/JorgeLNJunior/voting-app-back-end.git`
  2. Instale as dependências: `npm i`
  3. Renomeie o arquivo `.env.example` para `.env`
  4. Crie duas bases de dados, uma para a aplicação e outras para os testes
  5. Altere as variáveis do arquivo `.env` com as configurações das bases de dados e da storage account
  6. Banner e avatares podem ser armazenados tanto em uma storage account quanto localmente, para utilizar uma storage account modifique a variável `AZURE_STORAGE` no arquivo `.env` para `true`, ou `false` para armazenar localmente
  7. Para iniciar a aplicação execute `npm run dev`, para os testes execute `npm test`
  8. Caso esteja usado o VSCode abra a command palette com `Ctrl + Shift + P` e use o comando `Extensions: Show Recommended Extensions` para ver as extensões recomendadas


## CheckList
### User Stories

- [x] User can see a list of items he can vote on
- [x] These items must have a button that the user can click on to vote
- [x] After the user clicked a button, the user should see all the votes

### Bonus features

- [x] Store items and votes in a database
- [x] Only allow authenticated users to vote

## Licença
Distribuido sob a licença <a href="https://github.com/JorgeLNJunior/voting-app-back-end/blob/master/LICENSE.md" target="_blank"><strong>MIT »</strong></a>

