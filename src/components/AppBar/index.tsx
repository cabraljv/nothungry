import {
  AppBar as MDAppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRestaurant } from '../../hooks/restaurant';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appbar: {
      background: '#2d2d2d',
      color: '#38f9d7',
    },
    logo: {
      maxHeight: theme.spacing(5),
      color: '#38f9d7',
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(1),
    },
  })
);

interface Params {
  restaurantId: string;
}

const AppBar: React.FC = () => {
  const { name, logo } = useRestaurant();
  const classes = useStyles();
  const history = useHistory();
  const { restaurantId } = useParams<Params>();
  return (
    <div className={classes.root}>
      <MDAppBar className={classes.appbar} position="static">
        <Toolbar onClick={() => history.push(`/${restaurantId}`)}>
          <img src={logo} className={classes.logo} alt="nothungry" />
          <Typography className={classes.title} variant="h6" noWrap>
            {name}
          </Typography>
        </Toolbar>
      </MDAppBar>
    </div>
  );
};

export default AppBar;
