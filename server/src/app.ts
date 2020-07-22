import cors from 'cors';
import express, { Express } from 'express';
import path from 'path';

import 'dotenv/config';
import './database';
import routes from './routes';
import io from 'socket.io'
import http from 'http'
import jwt from 'jsonwebtoken'
import authConfig from './config/auth'
import { ThisMonthInstance } from 'twilio/lib/rest/api/v2010/account/usage/record/thisMonth';
interface IConnectedUsers{
  [key: string]: string
}
class App {
  server: http.Server;
  app: Express;
  socketIo: SocketIO.Server
  connectedUsers: IConnectedUsers = {};
  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);

    this.initSocket();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(
      express.urlencoded({
        extended: false,
      }),
    );
    this.app.use(express.json());
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
    );
    
  }
  initSocket(){
    this.socketIo = io(this.server);
    this.socketIo.on('connection', async (socket)=>{
      const bearer = socket.handshake.query.token;
      
      const [, token] = bearer.split(' ');
      try {
        const decoded = jwt.verify(token, authConfig.secret);

        const userId = (<any>decoded).id;
        this.connectedUsers[userId] = socket.id;
      } catch (err) {
        console.log(err)
      }
    })
    this.app.use((req,res,next)=>{
      req.io = this.socketIo;
      req.connectedClients = this.connectedUsers;
      next();
    })
  }
  routes() {
    this.app.use(routes);
  }
}

export default new App();
