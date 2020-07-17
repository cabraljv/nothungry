import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Product from '../models/Product';

class ProductControler {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.string().required(),
      type: Yup.number().required(),
    });
    if (!(await schema.validate(req.body)))
      return res.status(400).json({ error: 'Invalid fields' });

    const productRepo = getRepository(Product);
    const { name, description, price, type } = req.body;
    try {
      const product = productRepo.create({
        name,
        description,
        price,
        type,
        restaurant: req.userId,
        img_path: `${process.env.APP_URL}/files/${req.file.filename}`,
      });
      await productRepo.save(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal error' });
    }

    return res.status(201).json({ response: 'Product successfull created' });
  }
}

export default new ProductControler();
