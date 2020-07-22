import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Sidebar from '../components/Sidebar';
import OrderRequest from '../components/OrderRequest'
import {Container} from './styles'
import io from 'socket.io-client'
import {ToastContainer} from 'react-toastify';
import {useAuth} from '../hooks/auth'
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
export default function AppRoutes() {
  const {token} = useAuth();
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [newOrder, setNewOrder] = useState<IOrder | null>(null);

  useEffect(()=>{
     
    setSocket(io(process.env.REACT_APP_API_URL || '',{ query:{
      token: `Bearer ${token}`
    }}))
  },[token])
  useEffect(()=>{
    socket?.on('newOrder',(order: IOrder)=>{
      setNewOrder(order);
    })
  },[socket]);

  return (
    <>
      <Sidebar />
      {
        newOrder && <OrderRequest order={newOrder} handleClose={()=>setNewOrder(null)}/>
      }
      <Container>
          <Route path="/" exact component={Dashboard} />
      </Container>
      <ToastContainer />
    </>
  );
}
