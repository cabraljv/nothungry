import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: #666666;
  height: 100%;
  padding: 10px 15px;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  div {
    display: flex;
    flex-direction: column;
    button {
      background: none;
      border: 0;
      color: #ff3131;
      margin-left: auto;
    }
    p {
      color: #bfbfbf;
      font-size: 0.6rem;
    }
    p#price {
      color: #3bf4bc;
      font-weight: bold;
      font-size: 1.3rem;
      display: flex;
      span {
        font-size: 0.6rem;
        padding-top: 3px;
        padding-right: 2px;
      }
    }
  }
`;
