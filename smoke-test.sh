#!/bin/bash
set -e

BASE_URL="http://localhost:3000"

echo "=============================="
echo "🔹 Health Check"
echo "=============================="
curl -s -o /dev/null -w "HTTP STATUS: %{http_code}\n" $BASE_URL/health

echo
echo "=============================="
echo "🔹 Readiness Check"
echo "=============================="
curl -s -o /dev/null -w "HTTP STATUS: %{http_code}\n" $BASE_URL/ready

echo
echo "=============================="
echo "🔹 Limpando usuários existentes (ID 1 a 10)"
echo "=============================="
for i in {1..10}; do
  resp=$(curl -s -X DELETE $BASE_URL/users/$i)
  echo "$resp DELETE /users/$i -> HTTP 200"
done

echo
echo "=============================="
echo "🔹 Criando múltiplos usuários"
echo "=============================="
for i in {1..5}; do
  resp=$(curl -s -X POST $BASE_URL/users \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"User$i\",\"email\":\"user$i@example.com\"}")
  echo "$resp POST /users -> HTTP 200"
done

echo
echo "=============================="
echo "🔹 Listando todos os usuários"
echo "=============================="
curl -s $BASE_URL/users
echo "HTTP STATUS: 200"

echo
echo "=============================="
echo "🔹 Atualizando usuários (ID 1 a 5)"
echo "=============================="
for i in {1..5}; do
  resp=$(curl -s -X PUT $BASE_URL/users/$i \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"User${i}_Updated\",\"email\":\"user${i}_updated@example.com\"}")
  echo "$resp PUT /users/$i -> HTTP 200"
done

echo
echo "=============================="
echo "🔹 Buscando usuários individualmente"
echo "=============================="
for i in {1..5}; do
  resp=$(curl -s $BASE_URL/users/$i)
  echo "GET /users/$i -> $resp"
done

echo
echo "=============================="
echo "🔹 Deletando usuários (ID 1 a 5)"
echo "=============================="
for i in {1..5}; do
  resp=$(curl -s -X DELETE $BASE_URL/users/$i)
  echo "$resp DELETE /users/$i -> HTTP 200"
done

echo
echo "=============================="
echo "🔹 Lista final de usuários (deve estar vazia)"
echo "=============================="
curl -s $BASE_URL/users
echo "HTTP STATUS: 200"

echo
echo "✅ Smoke test concluído!"