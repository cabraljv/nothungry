import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Order from '../models/Order';
import { sendMessage } from '../services/WhatsApp';

class OrderDenyController {
  async store(req: Request, res: Response) {
    const { orderId } = req.params;
    const orderRepo = getRepository(Order);

    const order = await orderRepo.findOne(orderId, {
      relations: ['restaurant', 'user'],
    });
    if (!order) {
      return res.status(404).json({ error: 'Order does not exists' });
    }

    if (typeof order.restaurant !== 'string') {
      if (order.restaurant.id !== req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      order.denied = true;
      orderRepo.save(order);
      sendMessage(
        order.restaurant.whatsapp_number,
        order.user.whatsapp,
        'Seu pedido foi aceito pelo restaurante!',
      );
    }
    return res.json({ response: 'Order successfull denied' });
  }
}
export default new OrderDenyController();
