import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Order from '../models/Order';

class OrderController {
  async index(req: Request, res: Response) {
    const orderRepo = getRepository(Order);
    const orders = await orderRepo
      .createQueryBuilder('order')
      .where({
        restaurant: req.userId,
        concluided: false,
        accepted: true,
        denied: false,
      })
      .leftJoinAndSelect('order.products', 'products')
      .select([
        'order.adress',
        'order.reference',
        'products.name',
        'products.id',
        'order.id',
        'order.observation',
        'order.whatsapp',
        'order.created_at',
        'order.payment_method',
        'order.accepted',
        'order.reciver',
      ])
      .getMany();
    const pendingOrders = await orderRepo
      .createQueryBuilder('order')
      .where({
        restaurant: req.userId,
        concluided: false,
        accepted: false,
        denied: false,
      })
      .leftJoinAndSelect('order.products', 'products')
      .select([
        'order.adress',
        'order.reference',
        'products.name',
        'products.id',
        'order.id',
        'order.observation',
        'order.whatsapp',
        'order.created_at',
        'order.payment_method',
        'order.accepted',
        'order.reciver',
      ])
      .getMany();
    return res.json({ orders, pendingOrders });
  }

  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      reciver: Yup.string().required(),
      adress: Yup.string().required(),
      observation: Yup.string().required(),
      reference: Yup.string().required(),
      payment_method: Yup.number().required(),
      products: Yup.array().required(),
    });
    if (!(await schema.validate(req.body)))
      return res.json({ error: 'Invalid fields' });

    const orderRepo = getRepository(Order);
    const {
      id,
      reciver,
      adress,
      observation,
      reference,
      payment_method,
      products,
    } = req.body;
    let total = 0;
    for (let i = 0; i < products.length; i += 1) {
      total += products[i].price;
    }
    console.log(id);

    try {
      const order = await orderRepo.findOne({
        where: { id },
        relations: ['restaurant'],
      });

      if (!order) {
        return res.status(404).json({ error: 'This order not exists' });
      }
      if (order.sended) {
        return res.status(401).json({ error: 'This order cant be changed' });
      }

      order.adress = adress;
      order.payment_method = payment_method;
      order.reciver = reciver;
      order.observation = observation;
      order.products = products;
      order.reference = reference;
      order.total = total;

      orderRepo.save(order);
      console.log(order);
      await orderRepo.save(order);
      if (typeof order.restaurant !== 'string') {
        const restaurantSocketId = req.connectedClients[order.restaurant.id];
        req.io.to(restaurantSocketId).emit('newOrder', order);
      }
      return res.json({ response: 'Order successfull created' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new OrderController();
