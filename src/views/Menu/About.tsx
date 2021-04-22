import {
  Card,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useRestaurant } from '../../hooks/restaurant';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
    },
  })
);

const About: React.FC = () => {
  const classes = useStyles();
  const { name, phone } = useRestaurant();
  return (
    <Card className={classes.root}>
      <Typography>{name}</Typography>
      <Typography>Telefone: {phone}</Typography>
      <Typography>ABERTO</Typography>
    </Card>
  );
};

export default About;
