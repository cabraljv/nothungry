import React from 'react';
import {Route} from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Sidebar from '../components/Sidebar';
import {Container} from './styles'

export default function AppRoutes() {
  return (
    <>
      <Sidebar />
        <Container>
          <Route path="/" exact component={Dashboard} />
      </Container>
    </>
  );
}
