import { Request, Response, NextFunction } from 'express';

function catchErrors(method: Function) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await method(req, res);
        } catch (e) {
            next(e);
        }
    };
}

export { catchErrors };
