import { Notification } from './modules/Notification.js';
import { UI } from './modules/UI.js';

function listenToSocket() {
    // On contacte le serveur websocket directement, on ne passe pas par des proxy : les SSE et Websockets se proxifient très mal
    const ws = new WebSocket('ws://127.0.0.1:8081');

    ws.onmessage = async function (msg) {
        let message =
            'Vous êtes connecté à notre serveur, vous pouvez suivre les enchères';
        if (typeof msg.data === 'string') {
            const data = JSON.parse(msg.data);
            UI.makeHtml(data);
            message = 'Une enchère a été passé';
        }
        if (typeof msg.data === 'object') {
            message = await msg.data.text();
        }

        new Notification(message);
    };

    setTimeout(() => {
        ws.send('Hello');
    }, 1e3);
}

export { listenToSocket };
