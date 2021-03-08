import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  h1 {
    padding-top: 20px;
    padding-left: 30px;
  }
  main {
    width: 100%;
    height: calc(100vh - 60px);
    padding: 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 1fr 1fr 1fr;
    section {
      display: grid;
      overflow-x: hidden;
      grid-gap: 20px;
      width: 100%;
      > div {
        background: ${theme.light_gray};
        padding: 10px;
        border-radius: 10px;
      }
      div.card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        h3 {
          font-size: 1.6rem;
          position: absolute;
          top: 15px;
          left: 15px;
        }
        p {
          color: ${theme.primary};
          font-size: 2.8rem;
          font-weight: bold;
        }
      }
      div.chart-container {
        width: 100%;
        position: relative;
        h3 {
          font-weight: lighter;
          font-size: 1.1rem;
          padding-left: 15px;
          padding-bottom: 5px;
        }
        div.chart {
          position: absolute;
          left: -15px;
          width: calc(100vw - 540px);

          width: 100%;
          height: 80%;
          tspan {
            fill: #fff;
          }
        }
      }
    }
    section:first-of-type {
      grid-template-columns: 1fr 300px;
    }

    section:nth-child(2) {
      grid-template-columns: 300px 1fr;
    }
    section:last-of-type {
      grid-template-columns: 1fr;
      div.chart-container {
        height: 100%;
        div.chart {
        }
      }
    }
  }
`;
