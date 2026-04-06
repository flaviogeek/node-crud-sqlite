FROM node:20

WORKDIR /app

# Instala dependências para compilar sqlite
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# força build local (resolve GLIBC)
RUN npm install --build-from-source

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]