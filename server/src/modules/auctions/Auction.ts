import { Model } from '../../data/baseModel';
import { AuctionFormat } from './AuctionFormat';
import { pool } from '../../data/client';

class Auction extends Model {
    static table = 'auction';
    item_id?: number;
    ts?: string;
    item?: string;
    bid?: number;
    constructor(data: Partial<AuctionFormat>) {
        super(data.id);
        this.item_id = data.item_id;
        this.ts = data.ts;
        this.item = data.item;
        this.bid = data.bid;
    }

    static async findOne(id: number): Promise<Partial<Model>> {
        const query = {
            text: `SELECT * FROM "${this.table}" WHERE "item_id" = $1`,
            values: [id],
        };

        let ret = {};
        const res = await pool.query(query);

        if (res.rowCount) {
            ret = new this(res.rows[0]);
        }

        return ret;
    }
}

export { Auction };
