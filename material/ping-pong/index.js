const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const logFilePath = '/counter.txt';

// Create a directory for the logs if it doesn't exist
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

// Function to generate the log
function generateLog() {
    const message = "0";
    fs.writeFileSync(logFilePath, message); 
}

// Increment the counter every get request
app.get('/pingpong', (req, res) => {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading log file');
            return;
        }
        const counter = parseInt(data) + 1;
        fs.writeFileSync(logFilePath, `${counter}`);
        res.send(`<pre>ping pong ${counter}</pre>`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    generateLog();
});