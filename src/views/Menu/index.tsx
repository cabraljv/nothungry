import {
  createStyles,
  Fab,
  List,
  ListItem,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { useRestaurant } from '../../hooks/restaurant';
import { Product } from '../../@types/types';
import { useCart } from '../../hooks/cart';
import MyOrders from './MyOrders';
import About from './About';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    floatingButton: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    tabs: {
      width: '100%',
    },
  })
);

interface Props {
  data: Product[];
}
interface Params {
  restaurantId: string;
}
const ListItems: React.FC<Props> = ({ data }) => {
  const { restaurantId } = useParams<Params>();
  return (
    <List component="ul" style={{ width: '100%' }}>
      {data.map((item) => (
        <ListItem key={item.id}>
          <ProductCard restaurantId={restaurantId} data={item} />
        </ListItem>
      ))}
    </List>
  );
};
interface Params {
  restaurantId: string;
}

const Menu: React.FC = () => {
  const [value, setValue] = useState(0);
  const { cartSize } = useCart();

  const { search } = useLocation();
  function useQuery() {
    return new URLSearchParams(search);
  }
  const { updateOrder } = useRestaurant();
  const order = useQuery().get('order');
  useEffect(() => {
    if (order) {
      updateOrder(order);
    }
  }, [order]);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const { products } = useRestaurant();
  const foods = useMemo(() => products.filter((item) => item.type === 1), [
    products,
  ]);
  const drinks = useMemo(() => products.filter((item) => item.type === 2), [
    products,
  ]);
  const classes = useStyles();
  const history = useHistory();
  const { restaurantId } = useParams<Params>();
  return (
    <div>
      <Paper square style={{ background: '#2d2d2d' }}>
        <Tabs
          value={value}
          centered
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
          onChange={handleChange}
          scrollButtons="auto"
          aria-label="disabled tabs example"
        >
          <Tab label="LANCHES" />
          <Tab label="BEBIDAS" />
          <Tab label="PEDIDOS" />
          <Tab label="SOBRE" />
        </Tabs>
      </Paper>
      {value === 0 && <ListItems data={foods} />}
      {value === 1 && <ListItems data={drinks} />}
      {value === 2 && <MyOrders />}
      {value === 3 && <About />}

      <Fab
        color="primary"
        className={classes.floatingButton}
        variant="extended"
        disabled={cartSize === 0}
        onClick={() => history.push(`/${restaurantId}/checkout`)}
      >
        <ShoppingCartIcon />
        {cartSize} ITEMS
      </Fab>
    </div>
  );
};

export default Menu;
