import React, {useMemo} from 'react';

import { Container, Content } from './styles';
import api from '../../services/api'
interface Product{ 
  id: string;
  name: string;
}
interface IOrder{
  id: string;
  products: Product[];
  reciver: string;
  adress: string;
  observation: string;
  reference?: string;
  payment_method: number;
  whatsapp: string;
}
interface Props{
  order: IOrder;
  handleClose: ()=>void;
}

const OrderRequest: React.FC<Props> = ({order, handleClose}) => {
  const payment = useMemo(()=>{
    switch(order.payment_method){
      case 1:
        return 'A VISTA'
      case 2:
        return 'Cartão de crédito'
      case 3:
        return 'Cartão de débito'
    }
  },[order.payment_method]);

  async function handleAccept(){
    await api.put(`/order/accept/${order.id}`)
    handleClose();
  }

  return (
    <Container>
      <Content>
        <h2>Pedido recebido</h2>
        <div>
          <section>
            <div>
              {
                order.products.map((item)=>(
                  <p key={item.id}>{item.name}</p>
                ))
              }
            </div>
            <div id="observation">
            <p>{order.observation}</p>
            </div>
          </section>
          <section>
            <p>{order.reciver}</p>
            <p id="phone">{order.whatsapp}</p>
            <p>{order.reference}</p>
            <p>{payment}</p>
            <div id="buttons">
              <button onClick={handleClose}>RECUSAR</button>
              <button onClick={handleAccept}>ACEITAR</button>
            </div>
          </section>
        </div>
      </Content>
    </Container>
  )
} 

export default OrderRequest;