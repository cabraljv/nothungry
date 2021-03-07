import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  background: #2d2d2d;
  height: 100vh;
  width: 250px;
  position: fixed;
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    h1 {
      padding-left: 3px;
      color: #3bf4bc;
      font-size: 1.5rem;
    }
  }
  ul {
    margin-top: 30px;

    li {
      a {
        text-decoration: none;
        display: flex;
        padding: 10px 30px;
        align-items: center;
        margin-bottom: 5px;
        color: #8f8f8f;
        p {
          padding-left: 5px;
          font-size: 1rem;
        }
      }
    }
    li.active {
      a {
        color: #fff;
        background: #3c3c3c;
        border-left: 5px solid ${theme.primary};
      }
    }
  }
`;
