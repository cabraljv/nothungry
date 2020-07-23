import React,{ useMemo } from 'react';

import { Container } from './styles';
import api from '../../services/api';
interface Product{ 
  id: string;
  name: string;
}
interface IOrder{
  data:{
    id: string;
    products: Product[];
    reciver: string;
    adress: string;
    observation: string;
    reference: string;
    payment_method: number;
    whatsapp: string;
  };
  onUpdate: ()=>Promise<void>;
}
const Order: React.FC<IOrder> = ({data, onUpdate}) => {
  const number = useMemo(()=>data.whatsapp.replace('whatsapp:',''),[data])
  async function handleFinish(){
    await api.put(`/order/finish/${data.id}`)
    onUpdate();
  }
  return(
    <Container>
      <section>
        <div>
          {
            data.products.map((item)=>(
              <p key={item.id}>{item.name}</p>
            ))
          }
        </div>
        <div>
          <h4>{data.reciver}</h4>
          <h5>{number}</h5>
          <p>{data.adress}</p>
          <p>{data.reference}</p>
          <button onClick={handleFinish}>CONCLUÍDO</button>
        </div>
      </section>
      <footer>
        <p>{data.observation}</p>
      </footer>
    </Container>
  )
}

export default Order;