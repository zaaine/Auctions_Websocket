import { FetchClass } from './modules/Fetch.js';
import { listenToSocket } from './ws.js';
import { UI } from './modules/UI.js';
import { Notification } from './modules/Notification.js';

const url = 'http://localhost:3000';
async function handleForm(e) {
    e.preventDefault();
    const res = await new FetchClass(`${url}/create`)
        .make('POST')
        .send(Object.fromEntries(new FormData(e.target)));

    let level = 'success';
    if (res instanceof Error) {
        level = 'danger';
    }
    new Notification(res.message, level);
}
async function init() {
    listenToSocket();

    const { auctions, products } = await new FetchClass(url).make().send();

    if (auctions?.length && products?.length) {
        for (const auction of auctions) {
            UI.makeHtml(auction);
        }

        for (const product of products) {
            UI.makeSelect(product);
        }
    } else {
        new Notification('Problème de récupération des données', 'danger');
    }
    return document
        .querySelector('form')
        .addEventListener('submit', handleForm);
}

document.addEventListener('DOMContentLoaded', init);
