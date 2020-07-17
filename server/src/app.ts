import cors from 'cors';
import express, { Express } from 'express';
import path from 'path';

import 'dotenv/config';
import './database';
import routes from './routes';

class App {
  server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(
      express.urlencoded({
        extended: false,
      }),
    );
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App();
