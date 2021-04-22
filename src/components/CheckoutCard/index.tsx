import React, { useMemo } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Product, Addition } from '../../@types/types';
import { useRestaurant } from '../../hooks/restaurant';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: theme.spacing(1.9),
    },
    description: {
      fontSize: theme.spacing(1.4),
    },
    price: {
      fontWeight: 'bold',
      fontSize: theme.spacing(2),
    },
    content: {
      padding: theme.spacing(2),
      '&:last-child': {
        paddingBottom: 0,
      },

      flex: '1',
    },

    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
);

interface Props {
  handleDelete: () => void;
  data: Product;
}

const CheckoutCard: React.FC<Props> = ({ handleDelete, data }) => {
  const classes = useStyles();
  const { additions } = useRestaurant();
  const price = useMemo(() => {
    let aux = data.price;
    data.additions?.forEach((item) => {
      const addition = additions.find((item2) => item2.id === item);
      if (addition) aux += addition.price;
    });
    return aux.toFixed(2).replace('.', ',');
  }, [additions, data]);
  const additionsData = useMemo(() => {
    const aux = data.additions?.map((item) => {
      const atualAddition = additions.find((item2) => item2.id === item);
      if (atualAddition) return atualAddition;
      return {} as Addition;
    });
    return aux || [];
  }, [additions, data]);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          {data.name}
        </Typography>
        {additionsData && additionsData.length > 0 && (
          <Typography
            variant="subtitle1"
            className={classes.description}
            color="textSecondary"
          >
            Adicionais:{' '}
            {additionsData?.map((item, index) =>
              index === 0 ? item.description : `, ${item.description}`
            )}
          </Typography>
        )}

        <div className={classes.footer}>
          <Typography
            variant="subtitle1"
            className={classes.price}
            color="primary"
          >
            R$ {price}
          </Typography>
          <IconButton onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutCard;
