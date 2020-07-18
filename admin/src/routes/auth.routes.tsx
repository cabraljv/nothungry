import React from 'react';
import {Route} from 'react-router-dom';

import Login from '../pages/Login';
export default function AuthRoutes() {
  return (
    <>
      <Route path="/" exact component={Login} />
    </>
  );
}
