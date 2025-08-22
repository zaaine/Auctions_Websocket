import { AuctionsController } from '../auctions/AuctionsController';
import { ProductsController } from '../products/ProductsController';
import { AppController } from './AppController';

export const auctionsController = new AuctionsController();
export const productsController = new ProductsController();
export const appController = new AppController();
