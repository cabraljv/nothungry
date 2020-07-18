import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../hooks/auth';

const Routes: React.FC = () => {
  const {signed, loading} = useAuth();
  if (loading) {
    return <div></div>;
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
