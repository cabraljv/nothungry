import React, { useMemo } from 'react'
import { useCart } from '../../hooks/Cart'
import { Container } from './styles'
interface Props {
  data:{
    id: string;
    name: string;
    description:string;
    price: number;
    type: number;
    img_path?: string;
  };
}
const CheckoutItem: React.FC<Props> = ({ data }) => {
  const { removeItem } = useCart()
  const formatedPrice = useMemo(() => (
    data.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })
  ), [data.price])
  return (
    <Container>
      <div>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
      </div>
      <div>
        <p id="price"><span>R$</span>{formatedPrice}</p>
        <button onClick={() => removeItem(data)}>Remover</button>
      </div>
    </Container>)
}

export default CheckoutItem
