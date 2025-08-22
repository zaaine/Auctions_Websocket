import { Router } from 'express';
import { productsController } from '../app/bootstrap';
import { catchErrors } from '../../errorHandlers/catchErrors';
const productsRouter: Router = Router();

productsRouter.get('/', catchErrors(productsController.index));

export { productsRouter };
