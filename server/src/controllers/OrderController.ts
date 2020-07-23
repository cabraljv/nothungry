import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Order from '../models/Order';

class OrderController {
  async index(req: Request, res: Response){
    const orderRepo = getRepository(Order);
    const orders = await orderRepo
      .createQueryBuilder('order')
      .where({ restaurant: req.userId, concluided: false, accepted: true, denied: false })
      .leftJoinAndSelect('order.products', 'products')
      .select(['order.adress','order.reference','products.name', 'products.id', 'order.id','order.observation','order.whatsapp','order.created_at','order.payment_method', 'order.accepted', 'order.reciver'])
      .getMany()
      const pendingOrders = await orderRepo
      .createQueryBuilder('order')
      .where({ restaurant: req.userId, concluided: false, accepted: false, denied: false })
      .leftJoinAndSelect('order.products', 'products')
      .select(['order.adress','order.reference','products.name', 'products.id', 'order.id','order.observation','order.whatsapp','order.created_at','order.payment_method', 'order.accepted', 'order.reciver'])
      .getMany()
    return res.json({orders, pendingOrders})
  }
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      reciver: Yup.string().required(),
      adress: Yup.string().required(),
      observation: Yup.string().required(),
      reference: Yup.string().required(),
      whatsapp: Yup.string().required(),
      payment_method: Yup.number().required(),
      restaurant_id: Yup.string().required(),
      products: Yup.array().required(),
    });
    if (!(await schema.validate(req.body)))
      return res.json({ error: 'Invalid fields' });

    const orderRepo = getRepository(Order);
    const {
      reciver,
      adress,
      whatsapp,
      observation,
      reference,
      restaurant_id,
      payment_method,
      products,
    } = req.body;
    let total = 0;
    for (let i = 0; i < products.length; i += 1) {
      total += products[i].price;
    }
    const order = orderRepo.create({
      reciver,
      adress,
      reference,
      whatsapp,
      observation,
      total,
      restaurant: restaurant_id,
      payment_method,
      products,
    });
    await orderRepo.save(order);
    const restaurantSocketId  = req.connectedClients[restaurant_id];
    req.io.to(restaurantSocketId).emit('newOrder', order);

    return res.json({ response: 'Order successfull created' });
  }
}

export default new OrderController();
