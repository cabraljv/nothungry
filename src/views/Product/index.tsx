import {
  Button,
  createStyles,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Add, ArrowBack } from '@material-ui/icons';
import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AdditionCard from '../../components/AdditionCard';
import { useCart } from '../../hooks/cart';
import { useRestaurant } from '../../hooks/restaurant';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coverImage: {
      height: '30vh',
      width: '100%',
      objectFit: 'cover',
    },
    content: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    listItem: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    actionButton: {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
    floatingButton: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    backButton: {
      position: 'absolute',
      top: theme.spacing(7),
      left: theme.spacing(3),
    },
  })
);
interface Params {
  productId: string;
}
const Product: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { getProduct, additions } = useRestaurant();
  const { addProduct } = useCart();
  const { productId } = useParams<Params>();
  const data = useMemo(() => getProduct(productId), [productId, getProduct]);
  const [additionsFinal, setAdditionsFinal] = useState<string[]>([]);

  const price = useMemo(() => {
    if (!data) return '0,00';
    return data.price.toFixed(2).replace('.', ',');
  }, [data]);

  const handleAddAddition = useCallback(
    (id: string) => {
      const exists = additionsFinal.find((item) => item === id);
      if (exists) {
        const aux = additionsFinal;
        const index = additionsFinal.findIndex((item) => item === id);
        aux.splice(index, 1);
        setAdditionsFinal(aux);
      } else {
        setAdditionsFinal([...additionsFinal, id]);
      }
    },
    [additionsFinal]
  );

  const handleAddProduct = useCallback(() => {
    if (data) addProduct({ ...data, additions: additionsFinal });
    history.goBack();
  }, [data, additionsFinal, history, addProduct]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <img src={data?.img_path} alt="" className={classes.coverImage} />
        <IconButton
          className={classes.backButton}
          onClick={() => history.goBack()}
        >
          <ArrowBack />
        </IconButton>
        <Grid className={classes.content}>
          <Typography variant="h4">{data?.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {data?.description}
          </Typography>
          <Typography variant="h5" color="primary">
            R$ {price}
          </Typography>
          <List component="ul" style={{ width: '100%' }}>
            {additions.map((item) => (
              <ListItem className={classes.listItem} key={item.id}>
                <AdditionCard data={item} handleChange={handleAddAddition} />
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            color="primary"
            className={classes.actionButton}
            onClick={handleAddProduct}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <Fab
        color="primary"
        className={classes.floatingButton}
        aria-label="add"
        onClick={handleAddProduct}
      >
        <Add />
      </Fab>
    </Grid>
  );
};

export default Product;
