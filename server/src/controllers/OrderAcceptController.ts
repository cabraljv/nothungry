import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Order from '../models/Order';

class OrderAcceptController {
  async store(req: Request, res: Response) {
    const { orderId } = req.params;
    const orderRepo = getRepository(Order);

    const order = await orderRepo.findOne(orderId, {
      relations: ['restaurant'],
    });
    if (!order) {
      return res.status(404).json({ error: 'Order does not exists' });
    }
    if (typeof order.restaurant !== 'string') {
      if (order.restaurant.id !== req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }
    order.accepted = true;
    orderRepo.save(order);
    return res.json({ response: 'Order successfull accepted' });
  }
}
export default new OrderAcceptController();
