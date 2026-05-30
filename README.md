# Sistema de Gestão de Assinaturas Internet

Aluno: Felipe Alves
Disciplina: Desenvolvimento de Sistemas Backend
Fase: 2 - Microsserviços
Data de Entrega: Maio de 2026

## Visão Geral

Projeto em NestJS com arquitetura de microsserviços, comunicação via RabbitMQ e persistência em MySQL.

Serviços:
- api-gateway
- servico-gestao
- servico-faturamento
- servico-assinaturas-ativas

## Pré-requisitos

- Node.js 18+
- npm 9+
- MySQL 8+
- RabbitMQ 3+

## Passos para executar

Para configurar o ambiente de desenvolvimento, será necessário instalar as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [Xampp](https://www.apachefriends.org/index.html)

Assim que executar o Xampp, abra o terminal e digite `mysql` para se certificar que o MySQL está funcionando via terminal.

1. Inicie o MySQL.
2. Em cada serviço, execute:
   ```bash
   npm run setup
   ```
3. Em terminais separados, execute:
   ```bash
   cd api-gateway && npm run start:dev
   cd servico-gestao && npm run start:dev
   cd servico-faturamento && npm run start:dev
   cd servico-assinaturas-ativas && npm run start:dev
   ```
4. Acesse o sistema via API Gateway em:
   ```
   http://localhost:3000
   ```

## Interagir com a API

Para interagir com a API, utilize o Postman ou Insomnia para fazer as chamadas HTTP para as rotas da API.

[Clique aqui para ver a coleção de Postman](./Api Gateway.postman_collection.json)