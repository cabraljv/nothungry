import styled from 'styled-components';

export const Container = styled.div`
  header {
    display: flex;
    height: 130px;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      img {
        width: 70px;
      }
      h1 {
        padding-left: 5px;
        color: #3bf4bc;
        font-size: 1.3rem;
      }
    }
    h2 {
      font-size: 1.7rem;
    }
  }
  p {
    padding: 0 30px;
    font-size: 1.1rem;
  }
`;
