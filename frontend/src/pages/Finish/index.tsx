import React, { useEffect, useState } from 'react';

import { Container } from './styles';
import logo from '../../assets/images/logo.svg';

const Finish: React.FC = () => {
  const [name, setName] = useState<string>();
  useEffect(() => {
    const localData = localStorage.getItem('@restaurant');
    if (localData) {
      const restaurant = JSON.parse(localData);
      setName(restaurant.name);
    }
  }, []);
  return (
    <Container>
      <header>
        <div>
          <img src={logo} alt="" />
          <h1>{name}</h1>
        </div>
      </header>
      <p>
        Seu pedido foi enviado ao restaurant, você será notificado pelo whatsapp
        quando for aceito
      </p>
    </Container>
  );
};

export default Finish;
