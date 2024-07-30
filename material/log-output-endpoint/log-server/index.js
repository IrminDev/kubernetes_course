const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const logFilePath = 'files/data.txt';
const path = require('path');
const axios = require('axios');
const urlPingPong = process.env.PING_PONG_URL || 'http://localhost:3001';

// Create a directory for the logs if it doesn't exist
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

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
  fs.readFile(logFilePath, 'utf8', async (err, data) => {
    if (err) {
      res.status(500).send('Error reading log timestamp file');
      console.log(err);
      return;
    }

    console.log('Getting counter from ping-pong service');
    // Get the counter from ping-pong service
    const response = await axios.get(`${urlPingPong}/pingpong`);
    const counter = response.data;

    res.send(`<pre>${data}ping pong ${counter}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});