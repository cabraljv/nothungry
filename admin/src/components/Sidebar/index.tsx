import React from 'react';

import { FiGrid } from 'react-icons/fi';
import { MdRestaurant } from 'react-icons/md';
import { Container } from './styles';
import logo from '../../assets/images/logo.svg';

const Sidebar: React.FC = () => {
  return (
    <Container>
      <header>
        <img src={logo} alt="logo" />
        <h1>NotHungry</h1>
      </header>
      <ul>
        <li className="active">
          <FiGrid size={25} /> <p>Pedidos</p>
        </li>
        <li>
          <MdRestaurant size={25} /> <p>Cardápio</p>
        </li>
      </ul>
    </Container>
  );
};

export default Sidebar;
