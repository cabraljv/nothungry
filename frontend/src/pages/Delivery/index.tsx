import React, { useEffect, useState, useMemo } from 'react'
import { useCart } from '../../hooks/Cart'
import { Container } from './styles'
import api from '../../services/api'
const Delivery: React.FC = () => {
  const [whatsapp, setWhatsapp] = useState('')
  const [adress, setAdress] = useState('')
  const [name, setName] = useState('')
  const [reference, setReference] = useState('')
  const [payment, setPayment] = useState(1)

  const [restaurantName, setRestaurantName] = useState<string>()
  const [restaurant_id, setRestaurantId] = useState<string>()
  const { cart, observation } = useCart()
  useEffect(() => {
    const localData = localStorage.getItem('@restaurant')
    const whatsappData = localStorage.getItem('@whatsapp')
    if (localData && whatsappData) {
      const restaurant = JSON.parse(localData)
      console.log(restaurant.id)
      setRestaurantName(restaurant.name)
      setRestaurantId(restaurant.id)
      setWhatsapp(whatsappData)
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
  async function handleSubmit (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()
    try {
      const response = await api.post('order', {
        reciver: name,
        adress,
        reference,
        whatsapp,
        observation,
        restaurant_id,
        payment_method: payment,
        products: cart
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Container >
      <header>
        <div>
          <img src={require('../../assets/images/logo.svg')} alt=""/>
          <h1>{restaurantName}</h1>
        </div>
        <h2>Carrinho</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">NOME</label>
        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
        <label htmlFor="adress">ENDEREÇO DE ENTREGA</label>
        <input type="text" name="adress" id="adress" onChange={(e) => setAdress(e.target.value)} />
        <label htmlFor="adress">REFERÊNCIA (se houver)</label>
        <input type="text" name="adress" id="adress" onChange={(e) => setReference(e.target.value)} />
        <p>PAGEMENTO</p>
        <div>
          <input type="radio" name="payment" id="money" defaultChecked value={1} onChange={(e) => setPayment(parseInt(e.target.value))} />
          <label htmlFor="money" >A VISTA</label>
        </div>
        <div>
          <input type="radio" name="payment" id="creditcard" value={2} onChange={(e) => setPayment(parseInt(e.target.value))}/>
          <label htmlFor="creditcard">CARTÃO DE CRÉDITO</label>
        </div>
        <div>
          <input type="radio" name="payment" id="debitcard" value={3} onChange={(e) => setPayment(parseInt(e.target.value))}/>
          <label htmlFor="debitcard">CARTÃO DE DÉBITO</label>
        </div>
        <section>
          <p>TOTAL: <span>R${total}</span></p>
        </section>
        <button type="submit">FINALIZAR</button>
      </form>
    </Container>
  )
}

export default Delivery
