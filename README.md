# Node CRUD SQLite API 📦

Projeto de exemplo em Node.js usando SQLite, com Docker e deploy automatizado via `deploy.sh`. Inclui testes automáticos das rotas CRUD.

## Funcionalidades

### API REST para usuários:

- **GET** `/users` — lista todos os usuários
- **POST** `/users` — cria um novo usuário
- **GET** `/users/:id` — consulta usuário por ID
- **PUT** `/users/:id` — atualiza usuário por ID
- **DELETE** `/users/:id` — remove usuário por ID

### Outros recursos:

- Persistência via **SQLite**
- Dockerizado com **Node.js 22**
- Deploy automatizado via `deploy.sh`: limpa containers antigos e caches do Docker e NPM, atualiza código do GitHub, reconstrói e sobe o container, executa testes automáticos (`test.sh`) dentro do container
- Testes automáticos usando `curl + jq`

## Tecnologias

- Node.js 22
- Express.js
- SQLite
- Docker
- Bash scripting
- `jq` para parsing JSON nos testes

## Estrutura do Projeto

```bash
node-crud-sqlite/
├──📦 app.js                 # Código principal da API
├──📦 package.json
├──📦 package-lock.json
├──📦 Dockerfile             # Configuração Docker
├──📦 deploy.sh              # Script de deploy automatizado
├──📦 test.sh                # Script de testes automáticos
└──📦 README.md

Como rodar localmente (com Docker)

## 🚀 Como rodar localmente (com Docker)

### 1. Clone o repositório

```bash
git clone https://github.com/flaviogeek/node-crud-sqlite.git
cd node-crud-sqlite

2. Execute o deploy automatizado
Bashsudo ./deploy.sh

3. Ver os logs da API
Bashdocker logs -f node-crud-sqlite

A API estará disponível em: http://localhost:3000

🧪 Testes Automáticos
Os testes são executados automaticamente dentro do container pelo deploy.sh usando test.sh.
Você também pode rodar os testes manualmente:
Bash./test.sh

📌 Observações

O script deploy.sh limpa containers e caches antigos, puxa o código mais recente, reconstrói a imagem e sobe o container.
Todos os dados são armazenados no arquivo database.sqlite dentro do container.