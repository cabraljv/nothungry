import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

export default async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ error: 'Token as not provided' });
  }

  const [, token] = bearer.split(' ');
  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userId = (<any>decoded).id;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  return next();
};
