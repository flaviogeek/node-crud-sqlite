# Dockerfile
FROM node:20

WORKDIR /app

# Dependências
COPY package*.json ./
RUN npm install --build-from-source

# Código fonte
COPY . .

# Porta
EXPOSE 3000

# Inicializa app
CMD ["node", "index.js"]