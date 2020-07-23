import styled from 'styled-components';

export const Container = styled.div`
  background: #666666;
  height: 280px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  section{
    display: grid;
    grid-template-columns: 2fr 3fr;
    div{
      padding: 10px;
      p{
        font-size: 1rem;
        padding: 3px;
        color: #E8E8E8;
      }
      h4{
        font-size: 1.2rem;
        font-weight: normal;
      }
      h5{
        font-size: 0.9rem;
        font-weight: normal;
        margin-bottom: 10px;
      }
      div.buttons{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 5px;
        button{
          width: 100%;
          height: 40px;
          font-weight: bold;
          border: 0;
          border-radius: 5px;
          font-size: 0.65rem;
          margin-top: 20px;
          cursor: pointer;
        }
        button:first-child{
          color: #F09819;
          background: transparent;
        }
        button:last-child{
          color: #666666;
          background: linear-gradient(to bottom right, #43E97B 0%, #38F9D7 100%);
        }
      }

    }
  }
  footer{
    width:100%;
    height: 100px;
    margin-top: auto;
    border-radius: 0 0 10px 10px;
    background: #878787;
    padding: 10px;
  }
`;
