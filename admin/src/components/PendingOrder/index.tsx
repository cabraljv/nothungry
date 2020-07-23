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
  },
  onUpdate: ()=>Promise<void>;
}
const PendingOrder: React.FC<IOrder> = ({data, onUpdate}) => {
  const number = useMemo(()=>data.whatsapp.replace('whatsapp:',''),[data])
  const payment = useMemo(()=>{
    switch(data.payment_method){
      case 1:
        return 'A VISTA'
      case 2:
        return 'Cartão de crédito'
      case 3:
        return 'Cartão de débito'
    }
  },[data.payment_method]);

  async function handleAccept(){
    await api.put(`/order/accept/${data.id}`)
    onUpdate();
  }
  async function handleDeny(){
    await api.put(`/order/deny/${data.id}`)
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
          <p>{payment}</p>
          <div className="buttons">
            <button onClick={handleDeny}>RECUSAR</button>
            <button onClick={handleAccept}>ACEITAR</button>
          </div>
        </div>
      </section>
      <footer>
        <p>{data.observation}</p>
      </footer>
    </Container>
  )
}

export default PendingOrder;