import React, { useMemo } from 'react';

import { Container } from './styles';
import { useCart } from '../../hooks/Cart';
import less_icon from '../../assets/images/less.svg';
import add_icon from '../../assets/images/add.svg';

interface Props {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    type: number;
    img_path?: string;
  };
}
const Item: React.FC<Props> = ({ data }) => {
  const { addItem, removeItem, cart } = useCart();
  const formatedPrice = useMemo(
    () => data.price.toLocaleString('pt-br', { minimumFractionDigits: 2 }),
    [data.price]
  );
  const itensInCart = cart.filter((item) => item === data).length;
  return (
    <Container>
      <img src={data.img_path} alt="" />
      <div id="content">
        <div id="header">
          <h3>{data.name}</h3>
          <p>{data.description}</p>
        </div>
        <section>
          <p id="price">
            <span>R$</span>
            {formatedPrice}
          </p>
          <div>
            <button type="button" onClick={() => removeItem(data)}>
              <img src={less_icon} alt="" />
            </button>
            <p>{itensInCart}</p>
            <button type="button" onClick={() => addItem(data)}>
              <img src={add_icon} alt="" />
            </button>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Item;
