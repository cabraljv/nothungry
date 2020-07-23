import styled from 'styled-components';

export const Container = styled.div`
  h3{
    padding: 10px;
    font-size: 1.5rem;
  }
  .ordersContainer{
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    @media(min-width:800px){
      grid-template-columns: 1fr 1fr;
    }
    @media(min-width:1200px){
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media(min-width:1600px){
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media(min-width:2000px){
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
  hr{
    margin: 10px;
    border-radius: 2px; 
    border: 0;
    border-top: 1px solid #747474;
  }
`;
