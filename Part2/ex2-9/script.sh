#!/bin/bash

# URL de la API REST a la que se enviará el dato
API_URL="http://todo-backend-svc:3456/todos"  # Reemplaza con tu URL de API REST

# Obtener la URL aleatoria de Wikipedia
RESPONSE=$(curl -s -I -L "https://en.wikipedia.org/wiki/Special:Random")

# Extraer el header Location de la respuesta
LOCATION_HEADER=$(echo "$RESPONSE" | grep -i Location | sed -n 's/^Location: //Ip')

if [ -n "$LOCATION_HEADER" ]; then
    # Crear el payload con el header Location
    TODO="Read $LOCATION_HEADER"
    PAYLOAD=$(jq -n --arg todo "$TODO" '{todo: $todo}')

    # Enviar el payload a la API REST
    curl -X POST "$API_URL" -H "Content-Type: application/json" -d "$PAYLOAD"

    echo "Data sent successfully: $PAYLOAD"
else
    echo "Location header not found."
fi