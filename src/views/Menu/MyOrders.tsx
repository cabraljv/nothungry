import { List, ListItem } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { OrderAPI } from '../../@types/types';
import OrderCard from '../../components/OrderCard';
import { useRestaurant } from '../../hooks/restaurant';
import { getOrders, verifyOrder } from '../../services/orderApi';

const MyOrders: React.FC = () => {
  const { id } = useRestaurant();
  const ordersLocal = getOrders(id);
  const [orders, setOrders] = useState<OrderAPI[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verifyData() {
      setLoading(true);
      const newOrders = await Promise.all(
        ordersLocal.map((item) =>
          item.status === 'PENDENTE' ? verifyOrder(item.id) : { ...item }
        )
      );
      setOrders(newOrders);
      setLoading(false);
    }
    verifyData();
  }, []);

  return (
    <div>
      <List>
        {loading && (
          <>
            <ListItem>
              <Skeleton variant="rect" width="100%" height={100} />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="100%" height={100} />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="100%" height={100} />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="100%" height={100} />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="100%" height={100} />
            </ListItem>
          </>
        )}
        {orders.map((item) => (
          <ListItem key={item.id}>
            <OrderCard data={item} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MyOrders;
