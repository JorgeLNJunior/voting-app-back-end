<div align="center">
  <h1>Voting APP</h1>
</div>

<div align="center">

[![Travis Build](https://travis-ci.com/JorgeLNJunior/voting-app-back-end.svg?branch=master)](https://travis-ci.com/github/JorgeLNJunior/voting-app-back-end)
[![Coverage Status](https://coveralls.io/repos/github/JorgeLNJunior/voting-app-back-end/badge.svg?branch=master&service=github)](https://coveralls.io/github/JorgeLNJunior/voting-app-back-end?branch=master)
[![License](https://img.shields.io/github/license/JorgeLNJunior/voting-app-back-end)](https://github.com/JorgeLNJunior/voting-app-back-end/blob/master/LICENSE.md)
[![CodeFactor](https://www.codefactor.io/repository/github/jorgelnjunior/voting-app-back-end/badge)](https://www.codefactor.io/repository/github/jorgelnjunior/voting-app-back-end)

</div>

Aplicação feita com base no [Voting App](https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Voting-App.md)
do repositório [app-ideas](https://github.com/florinpop17/app-ideas). Para a documentação e organização do projeto acesse o seu respectivo [quadro no trello](https://trello.com/b/YacYdWhy/voting-app)

## Rotas
| Rota                             	| Descrição                    	|
|----------------------------------	|------------------------------	|
| /surveys                         	| cria uma survey              	|
| /surveys/:surveyID               	| lista uma survey             	|
| /suveys/:surveyID/vote/:optionID 	| vota em uma opção            	|
| /docs                            	| acessa a documentação da API 	|

## User Stories

- [x] User can see a list of items he can vote on
- [x] These items must have a button that the user can click on to vote
- [x] After the user clicked a button, the user should see all the votes

## Bonus features

- [x] Store items and votes in a database
- [ ] Only allow authenticated users to vote
