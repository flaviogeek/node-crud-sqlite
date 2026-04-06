# Node CRUD SQLite API 🗂️

![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Projeto de exemplo em Node.js usando SQLite, com Docker e deploy automatizado via [`deploy.sh`](./deploy.sh). Inclui testes automáticos das rotas CRUD.

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

### Outros recursos

- 💾 **Persistência** via SQLite
- 🐳 **Dockerizado** com Node.js 22
- 🚀 **Deploy automatizado** via [`deploy.sh`](./deploy.sh): limpa containers antigos e caches do Docker e NPM, atualiza código do GitHub, reconstrói e sobe o container, executa testes automáticos (`test.sh`) dentro do container
- ✅ **Testes automáticos** usando `curl` + `jq`

---

## Tecnologias

- [Node.js 22](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [Docker](https://www.docker.com/)
- Bash scripting
- [`jq`](https://stedolan.github.io/jq/) — para parsing JSON nos testes

---

## Estrutura do Projeto

```
node-crud-sqlite/
├── app.js            # Código principal da API
├── package.json
├── package-lock.json
├── Dockerfile        # Configuração Docker
├── deploy.sh         # Script de deploy automatizado
├── test.sh           # Script de testes automáticos
└── README.md
```

---

## Como rodar localmente (com Docker)

### 1. Clone o repositório

```bash
git clone https://github.com/com-usuario/node-crud-sqlite.git
cd node-crud-sqlite
```

### 2. Rode o deploy automatizado

```bash
sudo ./deploy.sh
```

### 3. Veja os logs da API

```bash
docker logs -f node-crud-sqlite
```

---

## Licença

MIT