import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';

import { connect } from './db';

// Initial config
dotenv.config();
const PORT: string | undefined = process.env.APP_PORT;
const HOST: string | undefined = process.env.APP_HOST;
connect();

// add express instance
const app = express();

// add midlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/', routes);

// start server
app.listen(PORT, (): void => {
  const url = `${HOST}:${PORT}`;
  console.log(`Server is running on: ${url}`);
});
