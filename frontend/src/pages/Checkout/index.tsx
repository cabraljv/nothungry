import React, { useState, useEffect, useMemo } from 'react'
import { Container, Content } from './styles'
import CheckoutItem from '../../components/CheckoutItem'
import { useCart } from '../../hooks/Cart'
import { Link } from 'react-router-dom'
interface Product{
  id: string;
  name: string;
  description:string;
  price: number;
  type: number;
  img_path?: string;
}
interface IRestaurant{
  id: string;
  name: string;
  phone: string;
  img_path: string;
  products: Product[];
}
const Checkout: React.FC = () => {
  const [name, setName] = useState<string>()
  const { cart } = useCart()
  useEffect(() => {
    const localData = localStorage.getItem('@restaurant')
    if (localData) {
      const restaurant = JSON.parse(localData)
      setName(restaurant.name)
    }
  }, [])
  const total = useMemo(() => {
    let aux = 0
    for (let i = 0; i < cart.length; i++) {
      aux += cart[i].price
    }
    console.log(cart.length)
    return aux.toLocaleString('pt-br', { minimumFractionDigits: 2 })
  }, [cart])
  return (
    <Container>
      <header>
        <div>
          <img src={require('../../assets/images/logo.svg')} alt=""/>
          <h1>{name}</h1>
        </div>
        <h2>Carrinho</h2>
      </header>
      <Content>
        <h6>PEDIDO</h6>
        {
          cart.map((item, index) => (
            <CheckoutItem data={item} key={index}/>
          ))
        }
        <h6>OBSERVAÇÕES</h6>
        <textarea placeholder="Ex: sem salada..."></textarea>
        <div id="total">
          <p>TOTAL:</p>
          <p>R${total}</p>
        </div>
        <div id="delivery">
          <Link to={'delivery'} >PROSSEGUIR PARA ENTREGA</Link>
        </div>
      </Content>
    </Container>
  )
}

export default Checkout
