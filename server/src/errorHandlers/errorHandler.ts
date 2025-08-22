import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
    status: number;
    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
    }
}
class FourOFour extends CustomError {}
function notFound(_req: Request, _res: Response, next: NextFunction) {
    const err: CustomError = new FourOFour('Not Found', 404);
    next(err);
}

function developmentErrors(
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(
            /[a-z_-\d]+.js:\d+:\d+/gi,
            '<mark>$&</mark>'
        ),
    };

    res.status(err.status || 500);
    res.format({
        // Based on the `Accept` http header
        // Form Submit, Reload the page
        'text/html': () => {
            res.send(`<pre>${errorDetails.stackHighlighted}</pre>`);
        },
        // Ajax call, send JSON back
        'application/json': () => res.json(errorDetails),
    });
}

/*
  Production Error Handler
  No stacktrace leaked to user
*/
function productionErrors(
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    res.status(err.status);
    res.json({
        message: err.message,
        error: {},
    });
}

export { notFound, developmentErrors, productionErrors };
