import { createServer } from 'node:http';
import WebSocket, { WebSocketServer } from 'ws';

const server = createServer();

server.on('request', (req, res) => {
    let url = req.url;

    if (url.toLowerCase() === '/message') {
        let payload = {};
        req.on('data', chunk => {
            payload = chunk.toString();
            broadcast(payload);
            res.setHeader('Content-Type', 'text/plain;charset=utf8');
            res.end('OK\n');
        });
    }
});

const wss = new WebSocketServer({ server });
wss.on('connection', client => {
    client.on('message', msg => {
        client.send(msg);
    });
});

function broadcast(msg) {
    for (const client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    }
}

server.listen(8081);
