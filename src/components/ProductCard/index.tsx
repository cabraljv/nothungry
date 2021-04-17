import React, { useMemo } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Product } from '../../@types/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: theme.spacing(2.3),
    },
    description: {
      fontSize: theme.spacing(1.5),
    },
    price: {
      fontWeight: 'bold',
      fontSize: theme.spacing(2),
    },
    content: {
      padding: theme.spacing(1),
      '&:last-child': {
        paddingBottom: 0,
      },
      flex: '1',
    },
    cover: {
      width: theme.spacing(45),
    },
  })
);

interface Props {
  restaurantId: string;
  data: Product;
}

const ProductCard: React.FC<Props> = ({ restaurantId, data }) => {
  const classes = useStyles();
  const history = useHistory();

  const price = useMemo(() => data.price.toFixed(2).replace('.', ','), [
    data.price,
  ]);

  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/${restaurantId}/product/${data.id}`)}
    >
      <CardMedia
        className={classes.cover}
        image={data.img_path}
        title={data.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h6" className={classes.title}>
            {data.name}
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.description}
            color="textSecondary"
          >
            {data.description}
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.price}
            color="primary"
          >
            R$ {price}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;
