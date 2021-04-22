import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { isBefore, subMinutes } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Product } from '../../@types/types';
import CheckoutCard from '../../components/CheckoutCard';
import { useCart } from '../../hooks/cart';
import { useRestaurant } from '../../hooks/restaurant';
import { getLastOrder, sendOrder } from '../../services/orderApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(3),
    },
    listItem: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.spacing(0.4),
      paddingBottom: theme.spacing(0.4),
    },

    divisor: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
    infoInput: {
      marginBottom: theme.spacing(1.5),
      width: '100%',
    },
  })
);
interface Params {
  restaurantId: string;
}

const Checkout: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const [obs, setObs] = useState('');
  const [adress, setAdress] = useState('');
  const [reference, setReference] = useState('');
  const [name, setName] = useState('');
  const { products, removeProduct, resetCart, cartSize } = useCart();
  const [money, setMoney] = useState<number | null>(null);
  const { order } = useRestaurant();
  const [toRemove, setToRemove] = useState<Product | null>(null);

  const history = useHistory();
  const { restaurantId } = useParams<Params>();
  const { id: resID } = useRestaurant();

  const [hasConfirmed, setHasConfirmed] = useState(true);
  useEffect(() => {
    const lastOrder = getLastOrder(resID);

    if (lastOrder) {
      const lastOrderDate = new Date(lastOrder.created_at);
      const atualDate = new Date();
      const aux = subMinutes(atualDate, 30);
      if (isBefore(aux, lastOrderDate)) {
        setHasConfirmed(false);
      }
    }
  }, []);
  useEffect(() => {
    if (cartSize === 0) {
      history.push(`/${restaurantId}`);
    }
  }, [cartSize, history, restaurantId]);
  const handleRemove = useCallback(() => {
    if (toRemove) removeProduct(toRemove);
    if (cartSize === 1) {
      history.push(`/${restaurantId}`);
    }
    setToRemove(null);
  }, [toRemove, removeProduct, cartSize, history, restaurantId]);

  const handleSubmit = useCallback(async () => {
    if (adress === '' || obs === '' || reference === '' || name === '') {
      toast('Preencha os campos corretamente', {
        type: 'error',
      });
      return;
    }

    try {
      const products_send = products.map((item) => ({
        id_product: item.id,
        additions: item.additions || [],
      }));
      if (value === 1) {
        await sendOrder({
          adress,
          restaurant: resID,
          reference,
          observation: `${obs} - Troco para ${money}`,
          payment_method: value,
          products: products_send,
          reciver: name,
        });
        resetCart();
        toast('Pedido criado com sucesso', {
          type: 'success',
          position: 'bottom-center',
        });
        history.push(`/${restaurantId}/finish`);
        return;
      }
      await sendOrder({
        adress,
        reference,
        restaurant: resID,
        observation: obs,
        payment_method: value,
        products: products_send,
        reciver: name,
      });
      resetCart();
      toast('Pedido criado com sucesso', {
        type: 'success',
        position: 'bottom-center',
      });
      history.push(`/${restaurantId}/finish`);
    } catch (error) {
      console.log(error);
      toast('Ocorreu um erro ao enviar o pedido', {
        type: 'error',
      });
    }
  }, [
    obs,
    name,
    adress,
    reference,
    products,
    order,
    value,
    money,
    history,
    restaurantId,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt((event.target as HTMLInputElement).value, 10));
  };
  return (
    <Grid container className={classes.content}>
      <Typography variant="h6">PEDIDO</Typography>
      <List component="ul" style={{ width: '100%' }}>
        {products.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem className={classes.listItem} key={index}>
            <CheckoutCard data={item} handleDelete={() => setToRemove(item)} />
          </ListItem>
        ))}

        <Divider className={classes.divisor} />
      </List>
      <Typography variant="h6">INFORMAÇÕES</Typography>
      <div style={{ width: '100%' }}>
        <TextField
          label="Observação"
          multiline
          className={classes.infoInput}
          placeholder="Ex: Sem salada"
          onChange={(e) => setObs(e.target.value)}
          rows={4}
          variant="filled"
        />
        <TextField
          className={classes.infoInput}
          label="Endereço de entrega"
          placeholder="Ex: Rua direita..."
          onChange={(e) => setAdress(e.target.value)}
          variant="filled"
        />
        <TextField
          className={classes.infoInput}
          label="Referencia"
          placeholder="Ex: ao lado da padaria x"
          onChange={(e) => setReference(e.target.value)}
          variant="filled"
        />
        <TextField
          className={classes.infoInput}
          label="Nome"
          placeholder="Ex: João"
          onChange={(e) => setName(e.target.value)}
          variant="filled"
        />
        <Divider className={classes.divisor} />
        <Typography variant="h6">MÉTODO DE PAGAMENTO</Typography>

        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value={2}
            control={<Radio color="primary" />}
            label="Cartao de crédito"
          />
          <FormControlLabel
            value={3}
            control={<Radio color="primary" />}
            label="Cartao de débito"
          />
          <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label="Dinheiro"
          />
        </RadioGroup>
        {value === 1 && (
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="troco-price">Troco para</InputLabel>
            <OutlinedInput
              id="troco-price"
              className={classes.infoInput}
              type="number"
              onChange={(e) => setMoney(parseInt(e.target.value, 10))}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              labelWidth={80}
            />
          </FormControl>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          ENVIAR PEDIDO
        </Button>
      </div>
      <Dialog open={!!toRemove} onClose={() => setToRemove(null)}>
        <DialogTitle>Remover item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja remover esse item do carrinho?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToRemove(null)}>Cancelar</Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={!hasConfirmed} onClose={() => setHasConfirmed(true)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você já realizou um pedido nos ultimos 30 minutos, deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.push(`/${restaurantId}`)}>
            Cancelar
          </Button>
          <Button
            onClick={() => setHasConfirmed(true)}
            color="primary"
            autoFocus
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Checkout;
