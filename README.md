<div align="center">
  <img src="https://i.imgur.com/cldg8Ie.png"></img>
</div>

<div align="center">

[![Travis Build](https://travis-ci.com/JorgeLNJunior/voting-app-back-end.svg?branch=master)](https://travis-ci.com/github/JorgeLNJunior/voting-app-back-end)
[![Coverage Status](https://coveralls.io/repos/github/JorgeLNJunior/voting-app-back-end/badge.svg?branch=master&service=github)](https://coveralls.io/github/JorgeLNJunior/voting-app-back-end?branch=master)
[![License](https://img.shields.io/github/license/JorgeLNJunior/voting-app-back-end)](https://github.com/JorgeLNJunior/voting-app-back-end/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/v/release/JorgeLNJunior/voting-app-back-end?color=lgreen)](https://github.com/JorgeLNJunior/voting-app-back-end/releases)

</div>

<div align="center">

[Frontend](https://github.com/JorgeLNJunior/voting-app-front-end/) | [Backend](https://github.com/JorgeLNJunior/voting-app-back-end/)

</div>

<div align="center">

Aplicação feita com base no [Voting App](https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Voting-App.md)
do repositório [app-ideas](https://github.com/florinpop17/app-ideas). Para mais informações acesse o seu respectivo [quadro no trello](https://trello.com/b/YacYdWhy/voting-app).

</div>

## Rotas
| HTTP   | Rota                             | Descrição                    | Autenticação |
|--------|----------------------------------|------------------------------|--------------|
| POST   | /register                        | registra um novo usuário     | não          |
| POST   | /login                           | autentica um usuário         | não          |
| GET    | /users/:id                       | lista um usuário             | sim          |
| POST   | /users/:id/password              | altera a senha do usuário    | sim          |
| PUT    | /users/:id                       | edita um usuário             | sim          |
| DELETE | /users/:id                       | deleta um usuário            | sim          |
| POST   | /surveys                         | cria uma survey              | sim          |
| GET    | /surveys/:surveyID               | lista uma survey             | não          |
| POST   | /suveys/:surveyID/vote/:optionID | vota em uma opção            | sim          |
| PUT    | /surveys/:surveyID               | edita uma survey             | sim          |
| DELETE | /surveys/:surveyID               | deleta uma survey            | sim          |
| GET    | /docs                            | acessa a documentação da API | não          |

## Tecnologias
- A fazer

## Instalação e configuração
- Requerimentos
  - [Node.js](https://nodejs.org/en/download/) na sua versão LTS
  - Um banco de dados relacional, prefencialmente [MySql](https://dev.mysql.com/downloads/)
- Opcional
  - Um banco de dados [MongoDB](https://www.mongodb.com/try/download/community)

- Instalação
  - Clone o projeto: `git clone https://github.com/JorgeLNJunior/voting-app-back-end.git`
  - Entre no diretório do projeto: `cd voting-app-back-end`
  - Abra o projeto no VSCode: `code .`
  - Instale as dependências: `npm i`
  - Renomeie o arquivo `.env.example` para `.env`
  - Crie duas bases de dados, uma para a aplicação e outras para os teste
  - Altere as variáveis do arquivo `.env` com as configurações das bases de dados
  - Para iniciar a aplicação execute `npm run dev`, para os testes execute `npm test`


## User Stories

- [x] User can see a list of items he can vote on
- [x] These items must have a button that the user can click on to vote
- [x] After the user clicked a button, the user should see all the votes

## Bonus features

- [x] Store items and votes in a database
- [x] Only allow authenticated users to vote

