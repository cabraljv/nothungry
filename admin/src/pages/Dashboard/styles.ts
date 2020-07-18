import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  @media(min-width:1200px){
    grid-template-columns: 1fr 1fr;
  }
  @media(min-width:1600px){
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media(min-width:2000px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
