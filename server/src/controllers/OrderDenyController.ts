import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Order from '../models/Order';

class OrderDenyController {
  async store(req: Request, res: Response) {
    const { orderId } = req.params;
    const orderRepo = getRepository(Order);

    const order = await orderRepo.findOne(orderId, {
      relations: ['restaurant'],
    });
    if (!order) {
      return res.status(404).json({ error: 'Order does not exists' });
    }

    if (order.restaurant !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    order.denied = true;
    orderRepo.save(order);
    return res.json({ response: 'Order successfull denied' });
  }
}
export default new OrderDenyController();
