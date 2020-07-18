import React,{ useMemo } from 'react';

import { Container } from './styles';
interface Product{ 
  id: string;
  name: string;
}
interface IOrder{
  data:{
    products: Product[];
    reciver: string;
    adress: string;
    observation: string;
    reference: string;
    payment_method: number;
    whatsapp: string;
  }
}
const Order: React.FC<IOrder> = ({data}) => {
  const number = useMemo(()=>data.whatsapp.replace('whatsapp:',''),[data])
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
          <button>CONCLUÍDO</button>
        </div>
      </section>
      <footer>
        <p>{data.observation}</p>
      </footer>
    </Container>
  )
}

export default Order;