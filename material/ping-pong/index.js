const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const counterService = require('./services/counterService');

// Increment the counter every get request
app.get('/pingpong', (req, res) => {
    counterService.incrementCounter();
    const count = counterService.getCounter();
    res.send(`Ping-pongs: ${count}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    generateLog();
});