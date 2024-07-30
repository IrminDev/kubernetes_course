const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const logFilePath = 'files/data.txt';
const logCounterPath = 'files/counter.txt';

// Function to generate the log
function generateLog() {
  const message = new Date().toISOString();
  // Add a random hash to message
  const hash = Math.random().toString(36).substring(7);
  fs.writeFileSync(logFilePath, `${message} ${hash}\n`);
}

// Generate the log every 5 seconds
setInterval(generateLog, 5000);

// Endpoint para servir el contenido del log
app.get('/', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading log timestamp file');
      console.log(err);
      return;
    }
    fs.readFile(logCounterPath, 'utf8', (err, counterData) => {
      if (err) {
        res.status(500).send('Error reading counter file');
        console.log(err);
        return;
      }
      res.send(`<pre>${data}</pre><pre>${counterData}</pre>`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});