# Node CRUD SQLite API 🗂️

![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Projeto de exemplo em Node.js usando SQLite, com Docker, estrutura modularizada e deploy automatizado via [`deploy.sh`](./deploy.sh). Inclui testes automáticos das rotas CRUD via [`smoke-test.sh`](./smoke-test.sh).

---

## Funcionalidades

### API REST para usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/users` | Lista todos os usuários |
| `POST` | `/users` | Cria um novo usuário |
| `GET` | `/users/:id` | Consulta usuário por ID |
| `PUT` | `/users/:id` | Atualiza usuário por ID |
| `DELETE` | `/users/:id` | Remove usuário por ID |

### Health e Readiness

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Verifica se a API está ativa |
| `GET` | `/ready` | Verifica se o banco está pronto |

### Outros recursos

- 💾 Persistência via SQLite  
- 🐳 Dockerizado com Node.js 22  
- 🚀 Deploy automatizado via [`deploy.sh`](./deploy.sh): limpa containers antigos, caches do Docker/NPM, atualiza código, reconstrói e sobe o container, executa testes automáticos  
- ✅ Testes automatizados usando `curl` + `jq`

---

## Tecnologias

- Node.js 22  
- Express.js  
- SQLite  
- Docker  
- Bash scripting  
- [`jq`](https://stedolan.github.io/jq/) para parsing JSON nos testes

---

## Estrutura do Projeto

```
node-crud-sqlite/
├── index.js          # Entry point da aplicação
├── app.js            # Configuração do Express e rotas
├── routes/
│   └── users.js      # Rotas CRUD de usuários
├── database.js       # Conexão e inicialização do SQLite
├── package.json
├── package-lock.json
├── Dockerfile        # Configuração Docker
├── deploy.sh         # Script de deploy automatizado
├── smoke-test.sh     # Script de testes automáticos
└── README.md
```

---

## Como rodar localmente (com Docker)

### 1. Clone o repositório

```bash
git clone https://github.com/flaviogeek/node-crud-sqlite.git
cd node-crud-sqlite
```

### 2. Rode o deploy automatizado

```bash
sudo ./deploy.sh
```

### 3. Teste a API manualmente (opcional)

```bash
curl http://localhost:3000/health
curl http://localhost:3000/ready
curl http://localhost:3000/users
```

### 4. Rode o smoke test completo

```bash
./smoke-test.sh
```

### 5. Veja os logs da API

```bash
docker logs -f node-crud_sqlite