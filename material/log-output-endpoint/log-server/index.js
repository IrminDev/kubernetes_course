const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const logFilePath = '/app/logs/random.txt';

// Crear un directorio para los logs si no existe
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

// Función para generar el log
function generateLog() {
  const timestamp = new Date().toISOString();
  const message = "This is awesome!";
  const logEntry = `${timestamp} - ${message}`;
  console.log(logEntry);
  fs.writeFileSync(logFilePath, logEntry);
}

// Generar el log cada 5 segundos
setInterval(generateLog, 5000);

// Endpoint para servir el contenido del log
app.get('/', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading log file');
      return;
    }
    res.send(`<pre>${data}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});