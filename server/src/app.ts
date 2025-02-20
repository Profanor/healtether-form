import express from 'express';
import { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
/**------------------------ */

// import routes
import indexRoute from './routes/index';

import main from './config/database';

// initialize database
main();

const app = express();

// middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', indexRoute);

// middleware to handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error('Not Found');
    error.status = 404;
    next(error); // pass the error to the next middleware
});
  
  // error-handling middleware
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message || 'Internal Server Error',
      },
    });
});

export default app;