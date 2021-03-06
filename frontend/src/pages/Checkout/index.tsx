import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';
import CheckoutItem from '../../components/CheckoutItem';
import { useCart } from '../../hooks/Cart';
import cart_logo from '../../assets/images/logo.svg';

const Checkout: React.FC = () => {
  const [name, setName] = useState('');
  const { cart, changeObservation } = useCart();
  useEffect(() => {
    const localData = localStorage.getItem('@restaurant');
    if (localData) {
      const restaurant = JSON.parse(localData);
      setName(restaurant.name);
    }
  }, []);
  const total = useMemo(() => {
    let aux = 0;
    cart.forEach((item) => {
      aux += item.price;
    });

    return aux.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }, [cart]);
  return (
    <Container>
      <header>
        <div>
          <img src={cart_logo} alt="" />
          <h1>{name}</h1>
        </div>
        <h2>Carrinho</h2>
      </header>
      <Content>
        <h6>PEDIDO</h6>
        {cart.map((item) => (
          <CheckoutItem data={item} key={item.id} />
        ))}
        <h6>OBSERVAÇÕES</h6>
        <textarea
          placeholder="Ex: sem salada..."
          onChange={(e) => changeObservation(e.target.value)}
        />
        <div id="total">
          <p>TOTAL:</p>
          <p>R${total}</p>
        </div>
        <div id="delivery">
          <Link to="delivery">PROSSEGUIR PARA ENTREGA</Link>
        </div>
      </Content>
    </Container>
  );
};

export default Checkout;
