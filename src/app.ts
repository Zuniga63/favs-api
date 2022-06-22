import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';

import { connect } from './db';

// Initial config
dotenv.config();
connect();

// add express instance
const app = express();
app.set('port', process.env.APP_PORT || '8080');
app.set('host', process.env.APP_HOST || 'http://localhost');

// add midlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/', routes);

export default app;
