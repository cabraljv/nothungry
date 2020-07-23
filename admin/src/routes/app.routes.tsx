import React from 'react';
import {Route} from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Sidebar from '../components/Sidebar';
import {Container} from './styles'
import {ToastContainer} from 'react-toastify';
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
  return (
    <>
      <Sidebar />

      <Container>
          <Route path="/" exact component={Dashboard} />
      </Container>
      <ToastContainer />
    </>
  );
}
