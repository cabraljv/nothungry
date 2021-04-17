import React, { useMemo } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Checkbox } from '@material-ui/core';
import { Addition } from '../../@types/types';

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
      padding: theme.spacing(1),
      '&:last-child': {
        paddingBottom: 0,
      },
      flex: '1',
    },
    cover: {
      width: theme.spacing(20),
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    checkbox: {
      display: 'flex',
      alignItems: 'center',
    },
    checkboxText: {
      fontSize: theme.spacing(1.5),
    },
  })
);

interface Props {
  data: Addition;
  handleChange: (id: string) => void;
}

const AdditionCard: React.FC<Props> = ({ data, handleChange }) => {
  const classes = useStyles();
  const price = useMemo(() => data.price.toFixed(2).replace('.', ','), [data]);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          {data.description}
        </Typography>

        <div className={classes.footer}>
          <Typography
            variant="subtitle1"
            className={classes.price}
            color="primary"
          >
            R$ {price}
          </Typography>
          <div className={classes.checkbox}>
            <Checkbox
              name="checkedB"
              color="primary"
              onChange={() => handleChange(data.id)}
            />
            <Typography variant="subtitle2" className={classes.checkboxText}>
              Incluir
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionCard;
