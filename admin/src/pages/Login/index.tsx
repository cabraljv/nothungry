import React from 'react';

import { Container } from './styles';

const Login: React.FC = () => {
  return(
    <Container>
      <header>
        <img src={require('../../assets/images/logo.svg')} alt="logo"/>
        <h1>NotHungry</h1>
      </header>
      <form>
        <label htmlFor="phone">TELEFONE</label>
        <input type="text" name="phone" id="phone"/>
        <label htmlFor="password">SENHA</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">ENTRAR</button>
      </form>
    </Container>
  )
}

export default Login;