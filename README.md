# Node CRUD SQLite API 🧩

Uma API REST simples e completa em **Node.js** usando **SQLite**, **Docker** e deploy automatizado.

Projeto de exemplo com rotas CRUD para usuários, persistência em SQLite, containerização com Docker e scripts de deploy e testes automáticos.

![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

## ✨ Funcionalidades

### API REST para Usuários

- `GET /users` — Lista todos os usuários
- `POST /users` — Cria um novo usuário
- `GET /users/:id` — Consulta usuário por ID
- `PUT /users/:id` — Atualiza usuário por ID
- `DELETE /users/:id` — Remove usuário por ID

### Outros Recursos

- Persistência com **SQLite** (arquivo único)
- Totalmente **Dockerizado** com Node.js 22
- Deploy automatizado via `deploy.sh`
- Testes automáticos com `curl + jq`

## 🛠 Tecnologias

- **Node.js** 22
- **Express.js**
- **SQLite**
- **Docker**
- Bash scripting
- **jq** (para testes)

## 📁 Estrutura do Projeto

```bash
node-crud-sqlite/
├── app.js                 # Código principal da API
├── package.json
├── package-lock.json
├── Dockerfile             # Configuração Docker
├── deploy.sh              # Script de deploy automatizado
├── test.sh                # Script de testes automáticos
└── README.md

🚀 Como rodar localmente (com Docker)
1. Clone o repositório
Bashgit clone https://github.com/flaviogeek/node-crud-sqlite.git
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