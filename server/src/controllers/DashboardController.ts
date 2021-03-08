import { format } from 'date-fns';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';
import Restaurant from '../models/Restaurant';

class DashboardController {
  async index(req: Request, res: Response) {
    const restaurantRepo = getRepository(Restaurant);
    const initial_month = new Date();
    initial_month.setHours(0);
    initial_month.setMinutes(1);
    initial_month.setDate(1);
    const restaurant = await restaurantRepo
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.orders', 'orders')
      .leftJoinAndSelect('orders.products', 'products')
      .select([
        'restaurant.name',
        'orders.total',
        'orders.id',
        'products.id',
        'products.name',
        'orders.updated_at',
        'orders.payment_method',
      ])
      .where(
        `orders.updated_at > '${initial_month.toISOString()}' and orders.concluided = true`,
        {
          id: req.userId,
        },
      )
      .getOne();

    const productRepo = getRepository(Product);

    const products_db = await productRepo
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.orders', 'orders')
      .where(
        `orders.restaurant_id = '${
          req.userId
        }' AND orders.updated_at > '${initial_month.toISOString()}' AND orders.concluided = true`,
      )
      .select([
        'products.id',
        'products.name',
        'products.description',
        'products.img_path',
        'products.price',
        'products.type',
        'products.created_at',
        'orders.updated_at',
      ])
      .getMany();

    const products = products_db.map(item => ({
      ...item,
      orders: item.orders.length,
    }));

    const day = new Date();
    day.setHours(0);
    day.setMinutes(1);
    day.setDate(1);

    const orders_per_day = [];
    let total_orders = 0;
    let total_earnings = 0;
    for (let i = 1; i <= new Date().getDate(); i += 1) {
      const atualDate = day;
      atualDate.setDate(i);
      const orders_in_day = restaurant.orders.filter(
        item => new Date(item.updated_at).getDate() === i,
      ).length;
      total_orders += orders_in_day;
      let earnings = 0;
      restaurant.orders.forEach(item => {
        if (new Date(item.updated_at).getDate() === i) {
          earnings += item.total;
        }
      });
      total_earnings += earnings;
      orders_per_day.push({
        day: format(atualDate, 'dd/MM'),
        orders: orders_in_day,
        earnings,
      });
    }

    res.json({
      per_day: orders_per_day,
      total_earnings,
      total_orders,
      products,
    });
  }
}

export default new DashboardController();
