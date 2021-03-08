import { subDays } from 'date-fns';
import { Request, Response } from 'express';
import { getRepository, MoreThan } from 'typeorm';
import * as Yup from 'yup';

import Order from '../models/Order';
import Product from '../models/Product';
import { sendMessage } from '../services/WhatsApp';

class OrderController {
  async index(req: Request, res: Response) {
    const orderRepo = getRepository(Order);
    const orders = await orderRepo
      .createQueryBuilder('order')
      .where({
        restaurant: req.userId,
        concluided: false,
        accepted: true,
        sended: true,
        denied: false,
      })
      .leftJoinAndSelect('order.products', 'products')
      .leftJoinAndSelect('order.user', 'user')
      .select([
        'order.adress',
        'order.reference',
        'products.name',
        'products.id',
        'products.price',
        'order.id',
        'order.observation',
        'user.whatsapp',
        'user.name',
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
        sended: true,
        created_at: MoreThan(subDays(new Date(), 1)),
      })
      .leftJoinAndSelect('order.products', 'products')
      .leftJoinAndSelect('order.user', 'user')
      .select([
        'order.adress',
        'order.reference',
        'products.name',
        'products.id',
        'products.price',
        'order.id',
        'order.observation',
        'user.whatsapp',
        'user.name',
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
      observation: Yup.string(),
      reference: Yup.string(),
      payment_method: Yup.number().required(),
      products: Yup.array().required(),
    });
    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

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

    const productsRepo = getRepository(Product);

    const products_db: Product[] = await Promise.all(
      products.map(async (item: string) =>
        productsRepo.findOne({ where: { id: item } }),
      ),
    );

    let total = 0;
    products_db.forEach(item => {
      total += item.price;
    });

    try {
      const order = await orderRepo.findOne({
        where: { id },
        relations: ['restaurant', 'user'],
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
      order.observation = observation || '';
      order.products = products_db;
      order.reference = reference || '';
      order.sended = true;
      order.total = total;
      await orderRepo.save(order);
      if (typeof order.restaurant !== 'string') {
        const restaurantSocketId = req.connectedClients[order.restaurant.id];

        req.io.to(restaurantSocketId).emit('newOrder', order);
      }
      await sendMessage(
        typeof order.restaurant !== 'string'
          ? order.restaurant.whatsapp_number
          : '',
        order.user.whatsapp,
        '*Seu pedido foi enviado para o restaurante!*',
      );
      return res.json({ response: 'Order successfull created' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new OrderController();
