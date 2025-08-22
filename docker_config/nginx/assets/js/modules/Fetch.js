class FetchClass {
    #methods = {
        GET: 'GET',
        POST: 'POST',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    };
    /**
     *
     * @param url
     * @param token
     * @returns {FetchClass}
     */
    constructor(url, token = null) {
        this.url = new URL(url);
        this.data = new FormData();
        this.token = token;
        this.headers = new Map([
            ['Content-Type', 'application/json'],
            ['Accept', 'application/json'],
            ['credentials', 'include'],
            ['mode', 'cors'],
        ]);

        return this;
    }

    /**
     * @param method string DEFAULT is GET : must be uppercase
     * @returns {FetchClass}
     */
    make(method = 'GET') {
        if (!(method in this.#methods)) {
            throw new Error('Houston, We have a problem');
        }

        this.req = new Request(this.url, {
            method: this.#methods[method],
        });

        for (const header of this.headers) {
            this.req.headers.set(header[0], header[1]);
        }

        if (this.token) {
            this.req.headers.set('x-csrf-token', `${this.token}`);
        }

        return this;
    }

    /**
     *
     * @returns {Promise<*>}
     * @param {object} data
     */
    async send(data = null) {
        for (let key in data) {
            this.data.append(key, data[key]);
        }

        try {
            let res;
            if (!data) {
                res = await fetch(this.req);
            } else {
                res = await fetch(this.req, {
                    body: JSON.stringify(Object.fromEntries(this.data)) ?? null,
                });
            }

            return await this.response(res);
        } catch (e) {
            return e;
        }
    }

    /**
     *
     * @param res
     * @returns {Promise<*>}
     */
    async response(res) {
        try {
            let data;
            if (res.status !== 204) {
                data = await res.json();
            }
            if (res.ok) {
                if (
                    res.headers.get('Content-Type') &&
                    res.headers.get('Content-Type').match('application/json')
                ) {
                    return data;
                }

                return await res.text();
            }
            console.log('ERROR', data);
            throw new Error(data.message);
        } catch (e) {
            return e;
        }
    }
}

export { FetchClass };
