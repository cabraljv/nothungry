import React, {createContext, useState, useContext, useEffect} from 'react';
import api from '../services/api';

interface Restaurant {
  name: string;
  phone: string;
}

interface AuthContextData {
  signed: boolean;
  restaurant: Restaurant | null;
  loading: boolean;
  signIn(phone: string, password: string): Promise<void>;
  signOut(): void;
}
interface ResponseSignInUser {
  token: string;
  restaurant: Restaurant;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
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

  const signIn = async (phone: string, password: string) => {
    try {
      const response = await api.post<ResponseSignInUser>('/session', {
        phone,
        password,
      });

      const {token, restaurant} = response.data;
      localStorage.setItem('@nothungry:token', token);
      localStorage.setItem('@nothungry:restaurant', JSON.stringify(restaurant));

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setRestaurant(restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    localStorage.clear();

    setRestaurant(null);
  };

  return (
    <AuthContext.Provider
      value={{restaurant, signIn, signOut, signed: !!restaurant, loading}}>
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
