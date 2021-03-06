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
  form {
    display: flex;
    flex-direction: column;
    margin: 10px 30px;
    label {
      font-size: 0.8rem;
      font-weight: bold;
      padding-top: 10px;
      padding-bottom: 3px;
    }
    input {
      height: 40px;
      border-radius: 5px;
      border: 0;
      background-color: #858585;
      padding: 0 5px;
      color: #fff;
    }
    p {
      margin-top: 15px;
      font-size: 0.8rem;
      padding-bottom: 10px;
      font-weight: bold;
    }
    div {
      display: flex;
      align-items: center;
      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: #d3d3d3;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        transition: background 0.5s ease;
      }
      input:checked {
        background-color: #3bf4bc;
      }
      input:checked + label {
        color: #3bf4bc;
      }
      label {
        font-size: 0.7rem;
        padding-left: 5px;
        padding-bottom: 10px;
        color: #d3d3d3;
        transition: color 0.5s ease;
      }
    }
    button {
      width: 100%;
      border: 0;
      padding: 20px;
      text-align: center;
      font-size: 0.9rem;
      font-weight: bold;
      color: #2d2d2d;
      background: linear-gradient(to bottom right, #43e97b 0%, #38f9d7 100%);
      border-radius: 10px;
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
    }
    section {
      p {
        color: #3bf4bc;
        font-weight: bold;
        padding-top: 4px;
        padding-right: 2px;
        font-size: 0.8rem;
        display: flex;
        span {
          color: #fff;
          margin-top: -4px;
          margin-left: 3px;
          font-size: 2rem;
          font-weight: bold;
        }
      }
      margin-bottom: 15px;
    }
  }
`;
