const http = require('http');
const port = process.env.PORT | 3000;

const server = http.createServer((req, res) => {
    res.end('server is running');
})

server.listen(port, () => {
    console.log('server is running on port 3000');
})