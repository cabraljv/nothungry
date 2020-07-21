import React from 'react';

import { Container, Content } from './styles';

const OrderRequest: React.FC = () => {
  return (
    <Container>
      <Content>
        <h2>Pedido recebido</h2>
        <div>
          <section>
            <div>
              <p>X-BURGUER</p>
              <p>X-BURGUER</p>
            </div>
            <div id="observation">
              <p>Sem salada</p>
            </div>
          </section>
          <section>
            <p>João Victor Cabral</p>
            <p id="phone">+5531984752284</p>
            <p>Rua Direita, 97</p>
            <p>Cartão de crédito</p>
            <div id="buttons">
              <button>RECUSAR</button>
              <button>ACEITAR</button>
            </div>
          </section>
        </div>
      </Content>
    </Container>
  )
} 

export default OrderRequest;