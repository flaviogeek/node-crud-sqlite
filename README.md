# Node CRUD SQLite API 🗃️

[![Node.js](https://img.shields.io/badge/Node.js-22-brightgreen?logo=node.js&logoColor=white)](https://nodejs.org/) [![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker&logoColor=white)](https://www.docker.com/)

Projeto de exemplo em Node.js usando SQLite, com Docker e deploy automatizado via deploy.sh. Inclui testes automáticos das rotas CRUD.

## Funcionalidades

API REST para usuários:

- GET /users – lista todos os usuários
- POST /users – cria um novo usuário
- GET /users/:id – consulta usuário por ID
- PUT /users/:id – atualiza usuário por ID
- DELETE /users/:id – remove usuário por ID

Outros recursos:

- Persistência via SQLite
- Dockerizado com Node.js 22
- Deploy automatizado via deploy.sh: limpa containers antigos e caches do Docker e NPM, atualiza código do GitHub, reconstrói e sobe o container, executa testes automáticos (test.sh) dentro do container
- Testes automáticos usando curl + jq

## Tecnologias

- Node.js 22
- Express.js
- SQLite
- Docker
- Bash scripting
- jq para parsing JSON nos testes

## Estrutura do Projeto
node-crud-sqlite/
├─ app.js # Código principal da API
├─ package.json
├─ package-lock.json
├─ Dockerfile # Configuração Docker
├─ deploy.sh # Script de deploy automatizado
├─ test.sh # Script de testes automáticos
└─ README.md

## Como rodar localmente (com Docker)

1. Clone o repositório:
git clone https://github.com/seu-usuario/node-crud-sqlite.git

cd node-crud-sqlite

2. Rodar o deploy automatizado:
sudo ./deploy.sh

3. Ver logs da API:
docker logs -f node-crud_sqlite

4. Testar endpoints manualmente:

curl http://localhost:3000/users
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"Flavio","email":"flavio@test.com"}'

## Como os testes funcionam

- test.sh roda dentro do container
- Testa todas as rotas CRUD automaticamente
- Mostra status de cada operação

## Observações

- deploy.sh garante que o container está limpo e atualizado
- SQLite é usado para simplicidade e testes locais
- Dockerfile inclui compilação do sqlite3 e instalação de jq