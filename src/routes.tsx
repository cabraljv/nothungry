import React from 'react';
import { Route } from 'react-router-dom';

import Main from './pages/Main';
import Delivery from './pages/Delivery';
import Checkout from './pages/Checkout';
import Finish from './pages/Finish';

import { CartProvider } from './hooks/Cart';

const Routes: React.FC = () => {
  return (
    <>
      <CartProvider>
        <Route path="/:restaurantId" exact component={Main} />
        <Route path="/:restaurantId/checkout" exact component={Checkout} />
        <Route path="/:restaurantId/delivery" exact component={Delivery} />
        <Route path="/:restaurantId/finish" exact component={Finish} />
      </CartProvider>
    </>
  );
};

export default Routes;
