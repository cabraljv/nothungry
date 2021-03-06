/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useMemo, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useCart } from '../../hooks/Cart';
import { Container } from './styles';
import logo from '../../assets/images/logo.svg';

import api from '../../services/api';

const Delivery: React.FC = () => {
  const [whatsapp, setWhatsapp] = useState('');
  const [adress, setAdress] = useState('');
  const [name, setName] = useState('');
  const [wrongFields, setWrongFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState('');
  const [payment, setPayment] = useState(1);
  const history = useHistory();

  const [restaurantName, setRestaurantName] = useState<string>();
  const [restaurant_id, setRestaurantId] = useState<string>();
  const { cart, observation, clearCart, order } = useCart();
  useEffect(() => {
    const localData = localStorage.getItem('@restaurant');
    const whatsappData = localStorage.getItem('@whatsapp');
    if (localData && whatsappData) {
      const restaurant = JSON.parse(localData);
      setRestaurantName(restaurant.name);
      setRestaurantId(restaurant.id);
      setWhatsapp(whatsappData);
    }
  }, []);
  const total = useMemo(() => {
    let aux = 0;
    cart.forEach((item) => {
      aux += item.price;
    });
    return aux.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }, [cart]);
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);
      let aux: string[] = [];
      if (name.length < 5) {
        aux.push('name');
      }
      if (adress.length < 5) {
        aux.push('adress');
      }
      if (aux.length > 0) {
        setWrongFields(aux);
        toast('Preencha todos os campos corretamente', { type: 'error' });
        setLoading(false);
        return;
      }
      if (order === '') {
        toast('Pedido inválido! inicie novamente', { type: 'error' });
        setLoading(false);
        return;
      }
      const cart_items = cart.map((item) => item.id);

      try {
        await api.post('order', {
          reciver: name,
          adress,
          id: order,
          reference,
          whatsapp,
          observation,
          restaurant_id,
          payment_method: payment,
          products: cart_items,
        });
        clearCart();
        history.push('finish');
      } catch (error) {
        toast(error, { type: 'error' });
      }
      setLoading(false);
    },
    [
      adress,
      reference,
      whatsapp,
      observation,
      restaurant_id,
      payment,
      cart,
      order,
      clearCart,
      history,
      name,
    ]
  );
  return (
    <Container loading={loading}>
      <div className="loading">
        <ClipLoader color="#3bf4bc" loading size={100} />
      </div>
      <header>
        <div>
          <img src={logo} alt="Not Hungry" />
          <h1>{restaurantName}</h1>
        </div>
        <h2>Finalizar</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">NOME</label>
        <input
          type="text"
          name="name"
          id="name"
          className={wrongFields.includes('name') ? 'wrong-input' : ''}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="adress">ENDEREÇO DE ENTREGA</label>
        <input
          type="text"
          name="adress"
          id="adress"
          className={wrongFields.includes('adress') ? 'wrong-input' : ''}
          onChange={(e) => setAdress(e.target.value)}
        />
        <label htmlFor="reference">REFERÊNCIA (se houver)</label>
        <input
          type="text"
          name="reference"
          id="reference"
          onChange={(e) => setReference(e.target.value)}
        />
        <p>PAGEMENTO</p>
        <div>
          <input
            type="radio"
            name="payment"
            id="money"
            defaultChecked
            value={1}
            onChange={(e) => setPayment(parseInt(e.target.value, 10))}
          />
          <label htmlFor="money">A VISTA</label>
        </div>
        <div>
          <input
            type="radio"
            name="payment"
            id="creditcard"
            value={2}
            onChange={(e) => setPayment(parseInt(e.target.value, 10))}
          />
          <label htmlFor="creditcard">CARTÃO DE CRÉDITO</label>
        </div>
        <div>
          <input
            type="radio"
            name="payment"
            id="debitcard"
            value={3}
            onChange={(e) => setPayment(parseInt(e.target.value, 10))}
          />
          <label htmlFor="debitcard">CARTÃO DE DÉBITO</label>
        </div>
        <section>
          <p>
            TOTAL: <span>R${total}</span>
          </p>
        </section>
        <button type="submit">FINALIZAR</button>
      </form>
    </Container>
  );
};

export default Delivery;
