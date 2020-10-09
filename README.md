<div align="center">
  <img src="https://i.imgur.com/cldg8Ie.png"></img>
</div>

<div align="center">

[![Travis Build](https://travis-ci.com/JorgeLNJunior/voting-app-back-end.svg?branch=master)](https://travis-ci.com/github/JorgeLNJunior/voting-app-back-end)
[![Coverage Status](https://coveralls.io/repos/github/JorgeLNJunior/voting-app-back-end/badge.svg?branch=master)](https://coveralls.io/github/JorgeLNJunior/voting-app-back-end?branch=master)
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
| HTTP   | Rota                             | Descrição                    |
|--------|----------------------------------|------------------------------|
| POST   | /register                        | registra um novo usuário     |
| POST   | /login                           | autentica um usuário         |
| GET    | /users/:id                       | lista um usuário             |
| PUT    | /users/:id                       | edita um usuário             |
| DELETE | /users/:id                       | deleta um usuário            |
| POST   | /surveys                         | cria uma survey              |
| GET    | /surveys/:surveyID               | lista uma survey             |
| POST   | /suveys/:surveyID/vote/:optionID | vota em uma opção            |
| PUT    | /surveys/:surveyID               | edita uma survey             |
| DELETE | /surveys/:surveyID               | deleta uma survey            |
| GET    | /docs                            | acessa a documentação da API |

## Tecnologias
- A fazer

## Instalação e configuração
- A fazer

## User Stories

- [x] User can see a list of items he can vote on
- [x] These items must have a button that the user can click on to vote
- [x] After the user clicked a button, the user should see all the votes

## Bonus features

- [x] Store items and votes in a database
- [x] Only allow authenticated users to vote

