# Guia de Execução

## Configurar o Ambiente de Desenvolvimento

Para configurar o ambiente de desenvolvimento, será necessário instalar as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [Xampp](https://www.apachefriends.org/index.html)

Assim que executar o Xampp, abra o terminal e digite `mysql` para se certificar que o MySQL está funcionando via terminal.

## Instalar as Dependências do Projeto

Para instalar as dependências do projeto, utilize o comando `cd servico-gestao && npm install` no terminal. Assim que finalizar, abra o terminal novamente e digite `cd servico-gestao && npm run setup:local` ou `npm run setup:cloud` para configurar o banco de dados local ou na nuvem, respectivamente.

## Executar o Projeto

Para executar o projeto, utilize o comando `cd servico-gestao && npm run start:dev` no terminal.

## Interagir com a API

Para interagir com a API, utilize o Postman ou Insomnia para fazer as chamadas HTTP para as rotas da API.

[Clique aqui para ver a coleção de Postman](./Serviço%20Gestão.postman_collection.json)
