import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

interface Restaurant {
  name: string;
  phone: string;
}

interface AuthContextData {
  signed: boolean;
  restaurant: Restaurant | null;
  loading: boolean;
  token: string;
  signIn(phone: string, password: string): Promise<void>;
  signOut(): void;
}
interface ResponseSignInUser {
  token: string;
  restaurant: Restaurant;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedToken = localStorage.getItem('@nothungry:token');
      const storagedUser = localStorage.getItem('@nothungry:restaurant');

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setRestaurant(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);
  const token = localStorage.getItem('@nothungry:token') || '';
  const signIn = async (phone: string, password: string) => {
    try {
      const response = await api.post<ResponseSignInUser>('/session', {
        phone,
        password,
      });

      const { token: token_api, restaurant: restaurant_api } = response.data;
      setRestaurant(restaurant);
      localStorage.setItem('@nothungry:token', token_api);
      localStorage.setItem(
        '@nothungry:restaurant',
        JSON.stringify(restaurant_api)
      );

      api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      toast('Login ou senha inválidos', { type: 'error' });
    }
  };

  const signOut = async () => {
    localStorage.clear();

    setRestaurant(null);
  };

  return (
    <AuthContext.Provider
      value={{
        restaurant,
        signIn,
        signOut,
        token,
        signed: !!restaurant,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used from within an AuthProvider');
  }

  return context;
}
