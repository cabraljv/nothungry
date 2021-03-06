import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/auth';
import { Container } from './styles';
import Order from '../../components/Order';
import api from '../../services/api';
import PendingOrder from '../../components/PendingOrder';

interface Product {
  id: string;
  name: string;
}
interface IOrder {
  id: string;
  products: Product[];
  reciver: string;
  adress: string;
  observation: string;
  reference: string;
  payment_method: number;
  user: {
    whatsapp: string;
  };
}
interface APIResponse {
  orders: IOrder[];
  pendingOrders: IOrder[];
}
const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pending, setPending] = useState<IOrder[]>([]);
  const { token } = useAuth();
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  async function handleUpdateOrders() {
    try {
      const response = await api.get<APIResponse>('order');
      setOrders(response.data.orders);
      setPending(response.data.pendingOrders);
    } catch (error) {
      toast(error, { type: 'error' });
    }
  }
  useEffect(() => {
    setSocket(
      io(process.env.REACT_APP_API_URL || '', {
        query: {
          token: `Bearer ${token}`,
        },
      })
    );
  }, [token]);
  useEffect(() => {
    socket?.on('newOrder', (order: IOrder) => {
      console.log(order);
      setPending([...pending, order]);
    });
  }, [socket, pending]);
  useEffect(() => {
    async function getDataFromAPI() {
      try {
        const response = await api.get<APIResponse>('order');
        setOrders(response.data.orders);
        setPending(response.data.pendingOrders);
      } catch (error) {
        toast(error, { type: 'error' });
      }
    }
    getDataFromAPI();
  }, []);
  return (
    <Container>
      <h3>PEDIDOS</h3>
      <div className="ordersContainer">
        {orders.map((item) => (
          <Order data={item} key={item.id} onUpdate={handleUpdateOrders} />
        ))}
      </div>
      <hr />
      <h3>PENDENTES</h3>
      <div className="ordersContainer">
        {pending.map((item) => (
          <PendingOrder
            data={item}
            key={item.id}
            onUpdate={handleUpdateOrders}
          />
        ))}
      </div>
    </Container>
  );
};

export default Dashboard;
