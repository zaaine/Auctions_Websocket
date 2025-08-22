import { Model } from '../../data/baseModel';
import { ProductFormat } from './ProductFormat';

class Product extends Model {
    static table = 'products';
    name?: string;
    item_id?: number;
    created_at?: string;
    constructor(data: Partial<ProductFormat>) {
        super(data.id);
        this.name = data.name;
        this.item_id = data.item_id;
        this.created_at = data.created_at;
    }
}

export { Product };
