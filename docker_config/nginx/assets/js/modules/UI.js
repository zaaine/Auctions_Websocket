import { ucfirst } from '../helpers/ucfirst.js';

class UI {
    static makeSelect(product) {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        document.getElementById('items').appendChild(option);
    }
    static makeHtml(auction) {
        const template = document.getElementById('auction');
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = ucfirst(auction.item);
        clone.querySelector('.price').textContent = auction.bid;
        clone.querySelector('.date').textContent = new Intl.DateTimeFormat(
            'fr-FR',
            {
                dateStyle: 'short',
                timeStyle: 'long',
                timeZone: 'Europe/Paris',
            }
        ).format(new Date(auction.ts));

        const items = document.querySelectorAll(
            '.auction_placeholder tbody tr'
        );

        for (const item of items) {
            if (item.querySelector('.item').textContent === auction.item) {
                item.remove();
            }
        }

        clone.querySelector('.price').style.backgroundColor = 'lightgreen';
        document.querySelector('.auction_placeholder tbody').appendChild(clone);

        setTimeout(() => {
            document
                .querySelectorAll('.price')
                .forEach(element => element.removeAttribute('style'));
        }, 5e3);
    }
}

export { UI };
