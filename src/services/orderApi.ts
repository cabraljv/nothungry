import { Order } from '../@types/types';
import api from '../infra/api';

export async function sendOrder(order: Order): Promise<void> {
  await api.post(`/order`, order);
}
