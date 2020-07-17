import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Restaurant from '../models/Restaurant';

class RestaurantController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      password: Yup.string().required(),
      url: Yup.string().required(),
      whatsapp_number: Yup.string().required(),
    });
    if (!(await schema.validate(req.body))) {
      return res.status(400).json({ error: 'Invalid fields' });
    }
    const { name, phone, password, url, whatsapp_number } = req.body;
    const restaurantRepo = getRepository(Restaurant);
    const restaurant = restaurantRepo.create({
      name,
      phone,
      url,
      whatsapp_number,
      img_path: `${process.env.APP_URL}/files/${req.file.filename}`,
      password: await bcrypt.hash(password, 8),
    });

    await restaurantRepo.save(restaurant);

    return res.status(201).json({ response: 'Restaurant sucessfull created' });
  }

  async show(req: Request, res: Response) {
    const restaurantRepo = getRepository(Restaurant);
    const restaurant = await restaurantRepo
      .createQueryBuilder('restaurant')
      .where({ url: req.params.id })
      .leftJoinAndSelect('restaurant.products', 'products')
      .select([
        'products.id',
        'products.name',
        'products.description',
        'products.price',
        'products.img_path',
        'products.type',
        'restaurant.img_path',
        'restaurant.name',
        'restaurant.phone',
      ])
      .getOne();
    return res.json(restaurant);
  }
}

export default new RestaurantController();
