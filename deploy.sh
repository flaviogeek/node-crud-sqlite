#!/bin/bash
set -e

CONTAINER_NAME="node-crud_sqlite"
IMAGE_NAME="node-crud_sqlite"
PORT=3000

echo "🧹 Limpando containers e imagens antigas..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true
docker rmi -f $IMAGE_NAME 2>/dev/null || true
docker builder prune -af
npm cache clean --force

echo "📦 Atualizando código do GitHub..."
git pull origin main

echo "💻 Limpando node_modules e package-lock.json antigos..."
rm -rf node_modules package-lock.json

echo "🚀 Construindo a imagem Docker..."
docker build -t $IMAGE_NAME .

echo "🛠️ Iniciando container..."
docker run -d --name $CONTAINER_NAME -p $PORT:3000 $IMAGE_NAME

echo "⌛ Aguardando a API iniciar..."
sleep 5

# Health check
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/health)
if [ "$STATUS" -eq 200 ]; then
  echo "✅ API saudável! Deploy concluído 🚀"
else
  echo "❌ API não respondeu corretamente (HTTP $STATUS)"
fi