declare namespace Express {
  export interface Request {
    userId?: string;
    io?: SocketIO.Server
    connectedClients?:{
      [key: string]: string
    }
  }
}
