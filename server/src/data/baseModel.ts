import { pool } from './client';

class Model {
    static table: string;
    id?: number;

    constructor(id?: number) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    static async findAll(): Promise<Model[]> {
        const query = `SELECT * FROM "${this.table}"`;

        const results = await pool.query(query);
        const data = [];

        if (results.rowCount) {
            for (let obj of results.rows) {
                data.push(new this(obj));
            }
        }

        return data;
    }

    static async findbyPk(id: number): Promise<Partial<Model>> {
        const query = {
            text: `SELECT * FROM "${this.table}" WHERE "id" = $1`,
            values: [id],
        };

        let ret = {};
        const res = await pool.query(query);

        if (res.rowCount) {
            ret = new this(res.rows[0]);
        }
        return ret;
    }

    static async create(data: {}): Promise<Partial<Model>> {
        const props = Object.keys(data);
        const values = Object.values(data);

        const query = {
            text: `INSERT INTO "${this.table}" (${props.join(
                ', '
            )}) VALUES (${values
                .map((_value, index) => `$${index + 1}`)
                .join(', ')})  RETURNING *`,
            values: values,
        };

        let ret: {} = {};
        const res = await pool.query(query);

        if (res.rowCount) {
            ret = new this(res.rows[0]);
        }

        return ret;
    }

    async update(): Promise<Partial<Model>> {
        const props = Object.keys(this);
        const values = Object.values(this);

        const sets = props.reduce((acc: any, curr: string, i: number) => {
            return [...acc, `"${curr}" = $${i + 1}`];
        }, '');

        const query = {
            text: `UPDATE "${
                (this.constructor as typeof Model).table
            }" SET ${sets}  WHERE "id" = ${this.getId()} RETURNING *`,
            values: values,
        };

        const res = await pool.query(query);

        return this.constructor(res.rows[0]);
    }

    async destroy(): Promise<boolean> {
        const query = {
            text: `DELETE FROM "${(this.constructor as typeof Model).table}" WHERE id = $1`,
            values: [this.getId()],
        };

        let ok = false;

        const res = await pool.query(query);

        if (res.rowCount) {
            ok = true;
        }

        return ok;
    }
}

export { Model };
