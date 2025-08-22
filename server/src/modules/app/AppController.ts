import { Request, Response } from 'express';
import { Auction } from '../auctions/Auction';
import { Product } from '../products/Product';

class AppController {
    async index(_req: Request, res: Response) {
        const auctions = await Auction.findAll();
        const products = await Product.findAll();
        res.json({ auctions, products });
    }
}

export { AppController };
