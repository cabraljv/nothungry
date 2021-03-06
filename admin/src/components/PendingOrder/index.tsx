import React, { useMemo } from 'react';

import { Container } from './styles';
import api from '../../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
}
interface IOrder {
  data: {
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
  };
  onUpdate: () => Promise<void>;
}
const PendingOrder: React.FC<IOrder> = ({ data, onUpdate }) => {
  const number = useMemo(() => data.user.whatsapp.replace('whatsapp:', ''), [
    data,
  ]);
  const payment = useMemo(() => {
    switch (data.payment_method) {
      case 1:
        return 'A VISTA';
      case 2:
        return 'Cartão de crédito';
      case 3:
        return 'Cartão de débito';
      default:
        return 'A VISTA';
    }
  }, [data.payment_method]);

  const total = useMemo(() => {
    let aux = 0;
    data.products.forEach((item) => (aux += item.price));
    return aux.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }, [data.products]);

  async function handleAccept() {
    await api.put(`/order/accept/${data.id}`);
    onUpdate();
  }
  async function handleDeny() {
    await api.put(`/order/deny/${data.id}`);
    onUpdate();
  }
  return (
    <Container>
      <section>
        <div>
          {data.products.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={`${item.id} ${index}`}>{item.name}</p>
          ))}
        </div>
        <div>
          <h4>{data.reciver}</h4>
          <h5>{number}</h5>
          <p>{data.adress}</p>
          <p>{data.reference}</p>
          <p>{payment}</p>
          <p>
            <strong>TOTAL: </strong>
            R${total}
          </p>
          <div className="buttons">
            <button type="button" onClick={handleDeny}>
              RECUSAR
            </button>
            <button type="button" onClick={handleAccept}>
              ACEITAR
            </button>
          </div>
        </div>
      </section>
      <footer>
        <p>{data.observation}</p>
      </footer>
    </Container>
  );
};

export default PendingOrder;
