import styled from 'styled-components';

export const Container = styled.div`
  header {
    display: flex;
    height: 130px;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
    background: #2d2d2d;
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
`;
export const Content = styled.div`
  margin: 0 30px;
  padding-top: 20px;
  h6 {
    padding-top: 15px;
    padding-bottom: 5px;
    font-size: 0.9rem;
  }
  textarea::placeholder {
    color: #e9e9e9;
  }
  a {
    width: 100%;
    padding: 20px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: #2d2d2d;
    text-decoration: none;
  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 5px;
    border-radius: 10px;
    background: #858585;
    resize: none;
    color: #fff;
  }
  div#delivery {
    background: linear-gradient(to bottom right, #43e97b 0%, #38f9d7 100%);
    border: 0;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    align-content: center;
    justify-items: center;
  }
  div#total {
    margin-top: 20px;
    margin-bottom: 40px;
    display: flex;
    p:first-child {
      color: #3bf4bc;
      font-weight: bold;
      padding-top: 4px;
      padding-right: 2px;
      font-size: 0.8rem;
    }
    p:last-child {
      font-size: 2rem;
      font-weight: bold;
    }
  }
`;
