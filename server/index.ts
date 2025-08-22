import cors = require('cors');
import { Application } from 'express';
import 'dotenv/config';
import express = require('express');
const app: Application = express();
import { appRouter } from './src/modules/app/appRouter';

import {
    developmentErrors,
    notFound,
    productionErrors,
} from './src/errorHandlers/errorHandler';

app.use(cors());

app.use(express.json());

app.use(appRouter);

app.use(notFound);

if (app.get('env') === 'development') {
    app.use(developmentErrors);
} else {
    app.use(productionErrors);
}
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});
