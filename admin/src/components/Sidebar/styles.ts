import styled from 'styled-components';

export const Container = styled.div`
  background: #2d2d2d;
  height: 100vh;
  width: 320px;
  position: fixed;
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    h1 {
      padding-left: 3px;
      color: #3bf4bc;
    }
  }
  ul {
    margin-top: 50px;
    li {
      display: flex;
      padding: 5px 30px;
      align-items: center;
      margin-bottom: 10px;
      color: #8f8f8f;
      p {
        padding-left: 5px;
        font-size: 1rem;
      }
    }
    li.active {
      color: #fff;
    }
  }
`;
