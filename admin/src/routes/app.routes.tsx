import React from 'react';
import { Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Dashboard from '../pages/Dashboard';
import Sidebar from '../components/Sidebar';
import { Container } from './styles';
import Products from '../pages/Products';

export default function AppRoutes() {
  return (
    <>
      <Sidebar />

      <Container>
        <Route path="/" exact component={Dashboard} />
        <Route path="/products" exact component={Products} />
      </Container>
      <ToastContainer />
    </>
  );
}
