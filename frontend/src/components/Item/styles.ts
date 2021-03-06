import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: #666666;
  margin: 10px 30px;
  border-radius: 15px;
  height: 100%;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 15px 0 0 15px;
  }

  div#content {
    width: 100%;
    display: flex;
    flex-direction: column;
    div#header {
      padding-left: 10px;
      padding-top: 5px;
      p {
        color: #bfbfbf;
        font-size: 0.7rem;
      }
    }

    section {
      margin-top: auto;
      padding-left: 10px;
      padding-bottom: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
      div {
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-right: 20px;
        p {
          padding: 0 5px;
        }
        button {
          border-radius: 20px;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          background: linear-gradient(
            to bottom right,
            #43e97b 0%,
            #38f9d7 100%
          );
          border: 0;
          img {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
`;
