import express from 'express';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
/**------------------------ */

// import routes
import indexRoute from './routes/index';
import authRoutes from './routes/auth';

import main from './config/database';

// initialize database
main();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', indexRoute);
app.use('/api/auth', authRoutes);

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
