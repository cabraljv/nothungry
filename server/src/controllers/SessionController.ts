import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import authConfig from '../config/auth';
import Restaurant from '../models/Restaurant';

class SessionController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      phone: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Invalid fields' });

    const restaurantRepo = getRepository(Restaurant);

    const { phone, password } = req.body;

    const restaurant = await restaurantRepo.findOne({ phone });

    if (!restaurant) return res.status(401).json({ error: 'User not found' });
    if (!(await bcrypt.compare(password, restaurant.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const { id, name } = restaurant;

    return res.json({
      restaurant: {
        name,
        phone,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
