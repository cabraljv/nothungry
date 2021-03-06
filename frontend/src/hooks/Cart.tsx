import React, { createContext, useState, useContext } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: number;
  img_path?: string;
}
interface ICartContext {
  cart: Product[];
  observation: string;
  changeObservation: (s: string) => void;
  addItem: (p: Product) => void;
  removeItem: (p: Product) => void;
  clearCart: () => void;
}

const CartContextData = createContext<ICartContext>({} as ICartContext);

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [observation, setObservation] = useState('');
  function addItem(p: Product) {
    setCart([...cart, p]);
  }
  function changeObservation(s: string) {
    setObservation(s);
  }
  function clearCart() {
    setCart([]);
  }
  function removeItem(p: Product) {
    const aux = [...cart];
    for (let i = 0; i < aux.length; i += 1) {
      if (aux[i].id === p.id) {
        aux.splice(i, 1);
        break;
      }
    }
    setCart(aux);
  }

  return (
    <CartContextData.Provider
      value={{
        cart,
        addItem,
        removeItem,
        changeObservation,
        clearCart,
        observation,
      }}
    >
      {children}
    </CartContextData.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContextData);

  if (!context) {
    throw new Error('useAuth must be used from within an AuthProvider');
  }

  return context;
}
