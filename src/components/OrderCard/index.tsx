import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { format } from 'date-fns/esm';
import React, { useMemo } from 'react';
import { OrderAPI } from '../../@types/types';

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
      fontWeight: 'normal',
    },
    description: {
      fontSize: theme.spacing(1.4),
    },
    price: {
      textTransform: 'uppercase',
      fontSize: theme.spacing(2),
      fontWeight: 'bold',
    },
    status: {
      textTransform: 'uppercase',
      fontSize: theme.spacing(2),
      fontWeight: 'bold',
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      flex: '1',
    },
  })
);
interface Props {
  data: OrderAPI;
}
const OrderCard: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const date = useMemo(
    () => format(new Date(data.created_at), 'dd/MM/yyyy - HH:mm'),
    [data]
  );
  const color = useMemo(() => {
    switch (data.status) {
      case 'PENDENTE':
        return '#e3c922';
        break;
      case 'ACEITO':
        return '#4ca832';
        break;
      case 'REJEITADO':
        return '';
        break;
      default:
        return '#ff3c19';
        break;
    }
  }, [data.status]);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.title}
          >
            {date}
          </Typography>
          <Typography className={classes.price}>R$ {data.total}</Typography>
        </div>
        <div>
          <Typography
            variant="subtitle1"
            style={{ color }}
            className={classes.status}
          >
            {data.status}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
