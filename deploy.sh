#!/bin/bash
set -e

cd "$(dirname "$0")"

CONTAINER_NAME="node-crud_sqlite"
IMAGE_NAME="node-crud_sqlite"
PORT=3000

echo "🧹 Limpando containers e imagens antigas..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true
docker rmi -f $IMAGE_NAME 2>/dev/null || true
docker builder prune -af
npm cache clean --force

echo "📦 Atualizando código do GitHub..."
git fetch --all
git reset --hard origin/main

echo "💻 Limpando node_modules e package-lock.json antigos..."
rm -rf node_modules package-lock.json

echo "🚀 Construindo a imagem Docker..."
docker build -t $IMAGE_NAME .

echo "🛠️ Iniciando container..."
docker run -d --name $CONTAINER_NAME -p $PORT:3000 $IMAGE_NAME

echo "⌛ Aguardando a API iniciar..."
sleep 5

echo "🔍 Verificando container..."
STATUS=$(docker inspect -f '{{.State.Running}}' $CONTAINER_NAME)

if [ "$STATUS" != "true" ]; then
  echo "❌ Container não iniciou!"
  docker logs $CONTAINER_NAME
  exit 1
fi

echo "🩺 Health check..."
for i in {1..10}; do
  if curl -s http://localhost:$PORT/health | grep -q "ok"; then
    echo "✅ API saudável! Deploy concluído 🚀"
    exit 0
  fi
  echo "🔄 Tentativa $i/10..."
  sleep 2
done

echo "❌ Health check falhou!"
docker logs $CONTAINER_NAME
exit 1