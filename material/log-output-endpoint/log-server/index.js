const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const logFilePath = 'files/time-stamp.txt';

// Endpoint para servir el contenido del log
app.get('/', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading log file');
      return;
    }
    // Show the timestamp and a random hash
    res.send(`<pre>${data}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});