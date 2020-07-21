import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Content = styled.div`
  width: 700px;
  height: 400px;
  background: #464646;
  padding: 30px;
  border-radius: 10px;
  h2{
    font-size: 2rem;
  }
  && > div{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    height: 100%;
    padding: 20px 0;
    section:first-child{
      display: flex;
      flex-direction: column;
      div{
        p{
          font-size: 1.1rem;
          color: #E2E2E2;
        } 
      }
      div#observation{
        margin-top: auto;
        margin-bottom: 30px;
        padding: 10px;
        border-radius: 5px;
        height: 100px;
        p{
          font-size: 0.9rem;
          color: #DADADA;
        }
        background: #666666;
      }
    }
    section:last-child{
      display: flex;
      flex-direction: column;
      p{
        font-size: 1.1rem;
        color: #E2E2E2;
        padding: 5px 0;
      }
      p#phone{
        font-size: 0.9rem;
        margin-top: -10px;
      }
      div#buttons{
        margin-top: auto;
        margin-bottom: 30px;
        margin-left:auto;
        button{
          padding: 10px 30px;
          margin: 0 5px;
          background: none;
          border: 0;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: bold;
          letter-spacing: 1px;
        }
        button:first-child{
          color: #F8753B;
        }
        button:last-child{
          color: #464646;
          background: linear-gradient(to bottom right, #43E97B 0%, #38F9D7 100%);
          border-radius: 5px;
        }
      }
    }
    
  }
`;
