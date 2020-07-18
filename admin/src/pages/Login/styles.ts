import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  header{
    display: flex;
    align-items: center;
    img{
      width: 120px;
    }
    h1{
      padding-left: 5px;
      font-size: 2rem;
      color: #3BF4BC;
    }
  }
  form{
    width: 400px;
    display: flex;
    flex-direction: column;
    label{
      font-size: 0.8rem;
      font-weight: bold;
      padding-bottom: 2px;
      margin-top: 15px;
    }
    input{
      height: 40px;
      border-radius: 5px;
      border: 0;
      background: #858585;
      padding: 0 5px;
      color: #fff;
      font-size: 1rem;
    }
    button{
      margin-top: 20px;
      width: 100%;
      border: 0;
      text-align: center;
      height: 50px;
      font-size: 0.9rem;
      font-weight: bold;
      color: #2D2D2D;
      background: linear-gradient(to bottom right, #43E97B 0%, #38F9D7 100%);
      border-radius: 10px;
      box-shadow: 0 4px 5px rgba(0,0,0,.2);
      cursor: pointer;
    }
  }
`;
