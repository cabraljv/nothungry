import React from 'react';
import { Route } from 'react-router-dom';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  return (
    <>
      <Route path="/:restaurantId" component={AppRoutes} />
    </>
  );
};

export default Routes;
