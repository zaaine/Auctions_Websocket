import { request } from 'node:http';
import { Readable } from 'node:stream';
import { Request, Response } from 'express';
import { Auction } from './Auction';
import { Model } from '../../data/baseModel';

class AuctionsController {
    async index(_req: Request, res: Response) {
        const auctions: Model[] = await Auction.findAll();

        res.json(auctions);
    }
    async create(req: Request, res: Response) {
        // Pour bien faire, il faudrait valider les données (joi.js)
        const data: {
            item_id: number;
            bid: number;
        } = req.body;

        const auction: Partial<Auction> = await Auction.findOne(+data.item_id);
        if (!auction) {
            return res.json({ message: 'Item does not exist' });
        }

        auction.bid = +data.bid;
        // @ts-ignore
        const newA = await auction.update();

        // SEND REQUEST WITH PAYLOAD TO SOCKET SERVER
        const options = {
            hostname: 'sockets',
            port: 8081,
            path: '/message',
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        };

        const socketRequest = request(options, response => {
            response.on('data', chunk => {
                if (chunk.toString() === 'OK\n') {
                    return res.json({
                        message: 'Votre enchère a été passée !',
                    });
                }
                return res
                    .status(500)
                    .json({ message: "Une erreur s'est produite" });
            });
        });

        const stream = new Readable();
        stream.push(JSON.stringify(newA));
        stream.push(null);
        stream
            .pipe(socketRequest)
            .on('error', (err: Error) => {
                return res.status(500).json({ message: err.message });
            })
            .on('finish', () => {
                console.log('DONE !');
            });

        return true;
    }
}

export { AuctionsController };
