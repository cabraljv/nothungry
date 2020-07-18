import styled from 'styled-components';

export const Container = styled.div`
  background: #666666;
  height: 280px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  section{
    display: grid;
    grid-template-columns: 1fr 1fr;
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
      button{
        width: 100%;
        height: 40px;
        font-weight: bold;
        color: #fff;
        background: linear-gradient(to bottom right, #FF5858 0%, #F09819 100%);
        border: 0;
        border-radius: 5px;
        margin-top: 20px;
        cursor: pointer;
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
