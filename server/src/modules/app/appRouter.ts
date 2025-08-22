import { Router } from 'express';
import { auctionsRouter } from '../auctions/router';
import { productsRouter } from '../products/router';
import { catchErrors } from '../../errorHandlers/catchErrors';
import { appController } from './bootstrap';

const appRouter: Router = Router();

appRouter.get('/', catchErrors(appController.index));

appRouter.use(auctionsRouter);
appRouter.use(productsRouter);

export { appRouter };
