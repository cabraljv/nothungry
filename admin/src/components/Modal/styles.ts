import styled from 'styled-components';

interface Props {
  open: boolean;
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  display: ${(p) => (p.open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  main {
    background: #464646;
    padding: 10px 20px;
    border-radius: 8px;
  }
`;
