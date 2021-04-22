import React, { createContext, useState, useContext } from 'react';
import { Addition, Product, Restaurant } from '../@types/types';
import logo from '../assets/logo.svg';

interface IRestaurantContext {
  id: string;
  products: Product[];
  name: string;
  order: string;
  logo: string;
  phone: string;
  additions: Addition[];
  updateOrder: (a: string) => void;
  getProduct: (id: string) => Product | undefined;
  updateData: (data: Restaurant) => void;
}

const RestaurantContextData = createContext<IRestaurantContext>(
  {} as IRestaurantContext
);

export const RestaurantProvider: React.FC = ({ children }) => {
  const [restaurant, setRestaurant] = useState<Restaurant>({
    id: '',
    img_path: '',
    name: 'NotHungry',
    phone: '',
    products: [],
    additions: [],
  });

  const [order, setOrder] = useState('');

  function updateData(p: Restaurant) {
    setRestaurant(p);
  }

  function getProduct(id: string): Product | undefined {
    return restaurant.products.find((item) => item.id === id);
  }

  return (
    <RestaurantContextData.Provider
      value={{
        name: restaurant.name,
        getProduct,
        id: restaurant.id,
        logo: restaurant.img_path || logo,
        products: restaurant.products,
        order,
        phone: restaurant.phone || '',
        updateOrder: setOrder,
        additions: restaurant.additions,
        updateData,
      }}
    >
      {children}
    </RestaurantContextData.Provider>
  );
};

export function useRestaurant() {
  const context = useContext(RestaurantContextData);

  if (!context) {
    throw new Error(
      'useRestaurant must be used from within an RestaurantProvider'
    );
  }

  return context;
}
