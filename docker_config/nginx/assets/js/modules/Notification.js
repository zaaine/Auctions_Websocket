class Notification {
    level;
    message;
    notif;
    duration;

    constructor(message, level = 'success', duration = 3e3) {
        this.message = message;
        this.level = level;
        this.duration = duration;
        this.notify();
    }

    create() {
        const div = document.createElement('div');
        div.innerText = this.message;
        div.classList.add('notification');
        div.classList.add(this.level);

        this.notif = div;
    }

    notify() {
        this.create();

        document.querySelector('.notification-container').append(this.notif);
        setTimeout(() => {
            document.querySelector('.notification').remove();
        }, this.duration);
    }
}

export { Notification };
