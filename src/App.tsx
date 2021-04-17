import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Routes from './routes';

const theme = createMuiTheme(
  {
    palette: {
      type: 'dark',
      primary: {
        main: '#38f9d7',
        contrastText: '#2d2d2d',
      },
    },
    spacing: 0,
  },
  ptBR
);
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
