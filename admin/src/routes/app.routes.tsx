import React from 'react';
import {Route} from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

export default function AppRoutes() {
  return (
    <>
        <Route path="/" exact component={Dashboard} />
    </>
  );
}
