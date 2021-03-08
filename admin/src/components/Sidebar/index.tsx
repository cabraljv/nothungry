import React from 'react';

import { RiFileList2Fill, RiDashboardFill } from 'react-icons/ri';
import { MdRestaurant } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { Container } from './styles';
import logo from '../../assets/images/logo.svg';

const Sidebar: React.FC = () => {
  const search = useLocation().pathname;
  return (
    <Container>
      <header>
        <img src={logo} alt="logo" />
        <h1>NotHungry</h1>
      </header>
      <ul>
        <li className={search.split('/')[1] === '' ? 'active' : ''}>
          <Link to="/">
            <RiDashboardFill size={25} /> <p>Dashboard</p>
          </Link>
        </li>
        <li className={search.split('/orders')[1] === '' ? 'active' : ''}>
          <Link to="/orders">
            <RiFileList2Fill size={25} /> <p>Pedidos</p>
          </Link>
        </li>
        <li className={search.split('/')[1] === 'products' ? 'active' : ''}>
          <Link to="/products">
            <MdRestaurant size={25} /> <p>Cardápio</p>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default Sidebar;
