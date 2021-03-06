import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/auth';
import { Container } from './styles';
import logo from '../../assets/images/logo.svg';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const schema = Yup.object().shape({
      phone: Yup.string().min(10),
      password: Yup.string().min(5),
    });

    if (!(await schema.isValid({ phone, password }))) {
      toast('Campos inválidos', { type: 'error' });
    } else {
      try {
        await signIn(phone, password);
      } catch (error) {
        toast('Falha ao realizar o login', { type: 'error' });
      }
    }
  }
  return (
    <Container>
      <header>
        <img src={logo} alt="logo" />
        <h1>NotHungry</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">TELEFONE</label>
        <input
          type="text"
          name="phone"
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="password">SENHA</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">ENTRAR</button>
      </form>
    </Container>
  );
};

export default Login;
