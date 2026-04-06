# Node CRUD SQLite API 🗃️

Um projeto de exemplo em **Node.js** usando **SQLite** para persistência, com **Docker** e deploy automatizado via `deploy.sh`. Inclui testes automáticos das rotas CRUD.

---

## 🔹 Funcionalidades

API REST para gerenciamento de usuários:

- `GET /users` – lista todos os usuários  
- `POST /users` – cria um novo usuário  
- `GET /users/:id` – consulta usuário por ID  
- `PUT /users/:id` – atualiza usuário por ID  
- `DELETE /users/:id` – remove usuário por ID  

Outros recursos:

- Persistência via **SQLite**  
- Dockerizado com **Node.js 22**  
- Deploy automatizado via `deploy.sh`:
  - Limpa containers antigos e caches do Docker e NPM  
  - Atualiza código do GitHub  
  - Reconstrói e sobe o container  
  - Executa testes automáticos (`test.sh`) dentro do container  
- Testes automáticos usando `curl` + `jq`  

---

## 🔹 Tecnologias

- Node.js 22  
- Express.js  
- SQLite  
- Docker  
- Bash scripting  
- jq para parsing JSON nos testes  

---

## 🔹 Estrutura do Projeto
node-crud-sqlite/
│
├─ app.js # Código principal da API
├─ package.json
├─ package-lock.json
├─ Dockerfile # Configuração Docker
├─ deploy.sh # Script de deploy automatizado
├─ test.sh # Script de testes automáticos
└─ README.md
---

## 🔹 Como rodar localmente (com Docker)

1. Clonar o repositório:

```bash
git clone https://github.com/seu-usuario/node-crud-sqlite.git
cd node-crud-sqlite

---

2. Rodar o deploy automatizado
```bash
sudo ./deploy.sh

3. Ver logs da API:
```bash
docker logs -f node-crud_sqlite

4. Testar endpoints manualmente:
```bash
curl http://localhost:3000/users
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"Flavio","email":"flavio@test.com"}'

🔹 Como os testes funcionam
test.sh roda dentro do container
Testa todas as rotas CRUD (GET, POST, PUT, DELETE) automaticamente
Mostra status de cada operação🔹 Como os testes funcionam
test.sh roda dentro do container
Testa todas as rotas CRUD (GET, POST, PUT, DELETE) automaticamente
Mostra status de cada operação

🔹 Observações
O deploy.sh garante que o container está limpo e atualizado antes de buildar.
SQLite é usado para simplicidade e testes locais.
Dockerfile inclui compilação do sqlite3 e instalação de jq.
