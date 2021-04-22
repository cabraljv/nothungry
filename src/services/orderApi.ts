import { Order, OrderAPI } from '../@types/types';
import api from '../infra/api';
import Storage from '../infra/storage';

export async function sendOrder(order: Order): Promise<void> {
  const response = await api.post<OrderAPI>(`/order`, order);
  const orderApi = response.data;
  let orders: OrderAPI[] = Storage.getItem(`orders-${order.restaurant}`);
  if (!orders) {
    Storage.setItem(`orders-${order.restaurant}`, [
      { ...orderApi, status: 'PENDENTE' },
    ]);
    return;
  }

  orders = [{ ...orderApi, status: 'PENDENTE' }, ...orders];
  Storage.setItem(`orders-${order.restaurant}`, orders);
}

export function getLastOrder(restaurant: string): OrderAPI | null {
  const data: OrderAPI[] | null = Storage.getItem(`orders-${restaurant}`);
  if (data) {
    return data[0];
  }
  return null;
}

export function getOrders(restaurant: string): OrderAPI[] {
  const data: OrderAPI[] = Storage.getItem(`orders-${restaurant}`);
  return data || [];
}

export function replaceOrders(orders: OrderAPI[], restaurant: string) {
  Storage.setItem(`orders-${restaurant}`, orders);
}

export async function verifyOrder(id: string): Promise<OrderAPI> {
  const response = await api.get<OrderAPI>(`/order/${id}`);
  let aux = { ...response.data, status: 'PENDENTE' };
  if (response.data.accepted) {
    aux.status = 'ACEITO';
    return aux;
  }
  if (response.data.denied) {
    aux.status = 'RECUSADO';
    return aux;
  }

  return aux;
}
