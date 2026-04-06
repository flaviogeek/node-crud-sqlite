# Node CRUD SQLite API 🗂️

![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Projeto de exemplo em Node.js usando SQLite, com Docker e deploy automatizado via [`deploy.sh`](./deploy.sh). Inclui observabilidade via logs e testes automáticos (`smoke-test.sh`).

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
- 🚀 **Deploy automatizado** via [`deploy.sh`](./deploy.sh): limpa containers antigos e caches do Docker e NPM, atualiza código do GitHub, reconstrói e sobe o container, executa testes automáticos (`smoke-test.sh`) dentro do container
- 👀 **Observabilidade**: logs detalhados para criação, atualização, deleção e acessos a endpoints (`docker logs -f node-crud_sqlite`)
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
├── app.js            # Código principal da API (modularizado)
├── index.js          # Entry point, inicia o servidor
├── database.js       # Conexão SQLite
├── routes/users.js   # Rotas CRUD de usuários com logs
├── package.json
├── package-lock.json
├── Dockerfile        # Configuração Docker
├── deploy.sh         # Script de deploy automatizado
├── smoke-test.sh     # Script de testes automáticos
└── README.md         # Este arquivo
```

---

## Observabilidade

- Todos os endpoints registram logs de acesso e operações.
- Exemplo de logs via Docker:

```bash
docker logs -f node-crud_sqlite
```

Exemplo de saída:
```
[2026-04-06T22:32:41.743Z] Conectado ao banco SQLite em /app/users.db
[2026-04-06T22:33:30.052Z] Listando todos os usuários (5 encontrados)
[2026-04-06T22:33:30.072Z] Usuário atualizado: ID 1, Nome: User1_Updated
[2026-04-06T22:33:30.219Z] Usuário deletado: ID 1
```

---

## Testes Automáticos (Smoke Test)

- Executa health check, readiness check, CRUD completo e valida logs.
- Exemplo de execução:

```bash
sudo ./smoke-test.sh
```

- Saída resumida:
```
🔹 Health Check -> HTTP 200
🔹 Readiness Check -> HTTP 200
🔹 Criando usuários 1-5 -> OK
🔹 Atualizando usuários 1-5 -> OK
🔹 Buscando usuários individualmente -> OK
🔹 Deletando usuários 1-5 -> OK
✅ Smoke test concluído!
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

### 3. Veja os logs da API

```bash
docker logs -f node-crud_sqlite
```

### 4. Teste endpoints manualmente ou com `smoke-test.sh`

```bash
sudo ./smoke-test.sh
```

---

## Licença

MIT
