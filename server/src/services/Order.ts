import { getRepository } from 'typeorm';

import Order from '../models/Order';
import User from '../models/User';

interface IResponse {
  status: number;
  error?: string;
  order?: string;
}

export async function createOrder(
  user_whatsapp: string,
  rest_id: string,
): Promise<IResponse> {
  const orderRepo = getRepository(Order);
  const userRepo = getRepository(User);

  try {
    const user = await userRepo.findOne({ where: { whatsapp: user_whatsapp } });

    const order = orderRepo.create({
      restaurant: rest_id,
      user,
    });

    await orderRepo.save(order);
    return { status: 201, order: order.id };
  } catch (error) {
    console.log(error);
    return { status: 500, error: 'Erro ao criar pedido' };
  }
}
