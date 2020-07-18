import React,{useEffect, useState} from 'react';

import { Container } from './styles';
import Order from '../../components/Order';
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
  reference: string;
  payment_method: number;
  whatsapp: string;
}
const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>();
  useEffect(()=>{
    async function getDataFromAPI(){
      try {
        const response = await api.get<IOrder[]>('order')
        setOrders(response.data)
      } catch (error) {
        
      }
    }
    getDataFromAPI();
  },[])
  return (
    <Container>
      {
        orders?.map((item)=>(
          <Order data={item} key={item.id}/>
        ))
      }
    </Container>
  )
}

export default Dashboard;