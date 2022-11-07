# Store Manager

Projeto da [Trybe](https://www.betrybe.com/ "Trybe") - API para gestão de produtos e vendas feita em Node.js.

## Descrição

Foi desenvolvido uma API de um CRUD (Create, Read, Update e Delete), utilizando a biblioteca mysql2 para fazer buscas e inserções no banco de dados e aplicando a arquitetura de software MSC (Model, Service, Controller).

## Tecnologias

- Node.js
- mysql2

## Execute o projeto

### Após clonar o projeto, instale as dependências:
`npm install`

------------

### Rodando com Docker:
Rode os serviços `node` e `db` com o comando:

`docker-compose up -d`

Popule o banco de dados com o comando:

`npm run restore`

Inicie a aplicação com o comando:

`npm start`

------------

### Rodando sem Docker:
Certifique-se de que você tenha o `node` instalado e uma conexão com o banco de dados MySQL na sua máquina.

Configure um arquivo `.env` na raíz do projeto com as seguintes variáveis de ambiente:

            MYSQL_HOST=localhost
            MYSQL_PORT=3306
            MYSQL_USER=root
            MYSQL_PASSWORD=password

Popule o banco de dados com o comando:

`npm run restore`

Inicie a aplicação com o comando:

`npm start`

------------

Rode os testes unitários:

`npm test`

------------

Agora você pode fazer uma requisição a qualquer rota da API.
