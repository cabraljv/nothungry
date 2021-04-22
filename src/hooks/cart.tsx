import React, { createContext, useState, useContext } from 'react';
import { Product } from '../@types/types';

interface ICartContext {
  products: Product[];
  cartSize: number;
  resetCart: () => void;
  addProduct: (p: Product) => void;
  removeProduct: (p: Product) => void;
}

const CartContextData = createContext<ICartContext>({} as ICartContext);

export const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct(p: Product) {
    setProducts([...products, p]);
  }

  function removeProduct(p: Product) {
    const index = products.findIndex((item) => item === p);
    const aux = products;
    aux.splice(index, 1);
    setProducts(aux);
  }

  function resetCart() {
    setProducts([]);
  }

  return (
    <CartContextData.Provider
      value={{
        products,
        cartSize: products.length,
        addProduct,
        resetCart,
        removeProduct,
      }}
    >
      {children}
    </CartContextData.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContextData);

  if (!context) {
    throw new Error('useCart must be used from within an CartProvider');
  }

  return context;
}
