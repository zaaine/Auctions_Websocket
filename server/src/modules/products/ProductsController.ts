import { Request, Response } from 'express';
import { Product } from './Product';

class ProductsController {
    async index(_req: Request, res: Response) {
        const products = await Product.findAll();

        res.json(products);
    }
}

export { ProductsController };
