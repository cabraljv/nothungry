import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Content } from './styles';
import api from '../../services/api';
import Item from '../../components/Item';
import { useCart } from '../../hooks/Cart';
import logo from '../../assets/images/logo.svg';
import shopping_logo from '../../assets/images/shopping.svg';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: number;
  img_path?: string;
}
interface IRestaurant {
  id: string;
  name: string;
  phone: string;
  img_path: string;
  products: Product[];
}

interface IParams {
  restaurantId: string;
}

const Main: React.FC = () => {
  const { restaurantId } = useParams<IParams>();
  const [restaurantData, setRestaurantData] = useState<IRestaurant>();
  const [productFilter, setProductFilter] = useState(1);
  const { search } = useLocation();
  const { cart, changeOrder } = useCart();
  function useQuery() {
    return new URLSearchParams(search);
  }
  const order = useQuery().get('order');

  useEffect(() => {
    async function getRestaurantData() {
      try {
        const response = await api.get<IRestaurant>(
          `restaurant/${restaurantId}`
        );
        setRestaurantData(response.data);
        localStorage.setItem('@restaurant', JSON.stringify(response.data));
        const whatsapp = search.split('?q=')[1];
        localStorage.setItem('@whatsapp', whatsapp);
      } catch (error) {
        toast(error, { type: 'error' });
      }
    }
    if (order) {
      changeOrder(order);
    }
    getRestaurantData();
  }, [restaurantId, search, order, changeOrder]);
  const cartLength = useMemo(() => cart.length, [cart]);
  return (
    <Container>
      <header>
        <section>
          <div>
            <img src={logo} alt="logo" />
            <h1>{restaurantData?.name}</h1>
          </div>
          <Link to={`${restaurantId}/checkout`}>
            <div>
              <img src={shopping_logo} alt="cart" />
              <span>
                <p>{cartLength}</p>
              </span>
            </div>
          </Link>
        </section>
        <nav>
          <button
            className={productFilter === 1 ? 'selected' : ''}
            type="button"
            onClick={() => setProductFilter(1)}
          >
            <p>COMIDAS</p>
          </button>
          <button
            className={productFilter === 2 ? 'selected' : ''}
            type="button"
            onClick={() => setProductFilter(2)}
          >
            <p>BEBIDAS</p>
          </button>
        </nav>
      </header>

      <Content>
        {restaurantData?.products.map(
          (item) =>
            item.type === productFilter && <Item data={item} key={item.id} />
        )}
      </Content>
    </Container>
  );
};

export default Main;
