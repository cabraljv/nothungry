import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  header {
    background-color: #2d2d2d;
    width: 100%;
    position: fixed;
    top: 0;
    section {
      height: 100px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 30px;
      a {
        text-decoration: none;
        display: flex;
        align-items: center;
      }
      div {
        display: flex;
        flex-direction: row;
        align-items: center;
        h1 {
          color: #3bf4bc;
          margin-left: 10px;
        }
        span {
          background: linear-gradient(
            to bottom right,
            #43e97b 0%,
            #38f9d7 100%
          );
          width: 15px;
          height: 15px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -10px;
          margin-top: 17px;
          p {
            color: #333;
            border-radius: 15px;
            font-size: 0.6rem;
            font-weight: bold;
          }
        }
      }
    }
    nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      button {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        border-bottom: 3px solid #2d2d2d;
        p {
          padding-bottom: 20px;
          font-weight: bold;
        }
      }
      button.selected {
        border-bottom: 3px solid #3bf4bc;
      }
    }
  }
`;
export const Content = styled.section`
  margin-top: 150px;
`;
