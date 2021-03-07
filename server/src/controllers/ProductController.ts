import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Product from '../models/Product';

class ProductControler {
  async index(req: Request, res: Response) {
    const productRepo = getRepository(Product);
    const products = await productRepo.find({
      where: { restaurant: req.userId },
    });
    return res.json(products);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    const productRepo = getRepository(Product);

    const product = await productRepo.findOne({
      where: { id, restaurant: req.userId },
    });

    if (!product) return res.status(404).json({ error: 'Product not founded' });
    await productRepo.remove(product);
    return res.json({ response: 'Product successfull removed' });
  }

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string(),
      description: Yup.string(),
      price: Yup.string(),
    });
    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error });
    }

    const productRepo = getRepository(Product);
    const { id, name, description, price } = req.body;

    const product = await productRepo.findOne({ where: { id } });
    if (!product)
      return res.status(404).json({ error: 'Product can not be founded' });

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (req.file)
      product.img_path = `${process.env.APP_URL}/files/${req.file.filename}`;

    await productRepo.save(product);

    return res.status(200).json({ error: 'Product successfull updated' });
  }

  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.string().required(),
      type: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body)))
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
