import React from 'react';

import { FiGrid } from 'react-icons/fi';
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
            <FiGrid size={25} /> <p>Pedidos</p>
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
