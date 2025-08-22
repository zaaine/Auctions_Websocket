import { Router } from 'express';
import { auctionsController } from '../app/bootstrap';
import { catchErrors } from '../../errorHandlers/catchErrors';
const auctionsRouter: Router = Router();

auctionsRouter.post('/create', catchErrors(auctionsController.create));

export { auctionsRouter };
