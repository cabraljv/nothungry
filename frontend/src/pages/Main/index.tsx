import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { Container, Content } from './styles'
import api from '../../services/api'
import Item from '../../components/Item'
import { useCart } from '../../hooks/Cart'
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
const Main: React.FC = () => {
  const { restaurantId } = useParams()
  const [restaurantData, setRestaurantData] = useState<IRestaurant>()
  const [productFilter, setProductFilter] = useState(1)
  const { search } = useLocation()
  const { cart } = useCart()
  useEffect(() => {
    async function getRestaurantdata () {
      try {
        const response = await api.get<IRestaurant>(`restaurant/${restaurantId}`)
        setRestaurantData(response.data)
        localStorage.setItem('@restaurant', JSON.stringify(response.data))
        const whatsapp = search.split('?q=')[1]
        localStorage.setItem('@whatsapp', whatsapp)
      } catch (error) {
        console.log(error)
      }
    }
    getRestaurantdata()
  }, [restaurantId, search])
  const cartLength = useMemo(() => cart.length, [cart])
  return (
    <Container>

      <header>
        <section>
          <div>
            <img src={require('../../assets/images/logo.svg')} alt="logo"/>
            <h1>{restaurantData?.name}</h1>
          </div>
          <Link to={`${restaurantId}/checkout`}>
            <div>
              <img src={require('../../assets/images/shopping.svg')} alt="cart"/>
              <span>
                <p>{cartLength}</p>
              </span>
            </div>
          </Link>
        </section>
        <nav>
          <div className={productFilter === 1 ? 'selected' : ''} onClick={() => setProductFilter(1)}>
            <p>COMIDAS</p>
          </div>
          <div className={productFilter === 2 ? 'selected' : ''} onClick={() => setProductFilter(2)}>
            <p>BEBIDAS</p>
          </div>
        </nav>
      </header>

      <Content>
        {
          restaurantData?.products.map(item => (
            item.type === productFilter &&
            <Item data={item} key={item.id}/>
          ))
        }
      </Content>

    </Container>)
}

export default Main
