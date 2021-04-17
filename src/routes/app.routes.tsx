import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import AppBar from '../components/AppBar';
import { CartProvider } from '../hooks/cart';
import { RestaurantProvider, useRestaurant } from '../hooks/restaurant';
import { getRestaurant } from '../services/restaurantApi';
import Checkout from '../views/Checkout';
import Menu from '../views/Menu';
import Product from '../views/Product';
import 'react-toastify/dist/ReactToastify.css';
import Finish from '../views/Finish';

interface Params {
  restaurantId: string;
}

const AppRoutesOutside: React.FC = () => {
  return (
    <RestaurantProvider>
      <AppRoutes />
      <ToastContainer />
    </RestaurantProvider>
  );
};

const AppRoutes: React.FC = () => {
  const { updateData } = useRestaurant();
  const { restaurantId } = useParams<Params>();
  useEffect(() => {
    async function getData() {
      try {
        const restaurant = await getRestaurant(restaurantId);
        updateData(restaurant);
      } catch (error) {
        toast('Ocorreu um erro ao recuperar os dados do restaurante', {
          type: 'error',
        });
      }
    }
    getData();
  }, [restaurantId]);
  return (
    <>
      <CartProvider>
        <AppBar />
        <Route path="/:restaurantId" exact component={Menu} />
        <Route path="/:restaurantId/checkout" exact component={Checkout} />
        <Route
          path="/:restaurantId/product/:productId"
          exact
          component={Product}
        />
        <Route path="/:restaurantId/finish" exact component={Finish} />
      </CartProvider>
    </>
  );
};

export default AppRoutesOutside;
