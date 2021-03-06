import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  table {
    margin: 20px auto;
    width: 80%;
    tr {
      display: grid;
      grid-template-columns: 0.8fr 1.5fr 5fr 100px 80px;
      margin-bottom: 7px;
    }
    thead {
      th {
        text-align: start;
      }
    }
    tbody {
      tr {
        td {
          display: flex;
          align-items: center;
          padding: 4px 10px;
          background: #666666;
          img {
            width: 100%;
          }
        }
        td:first-of-type {
          border-radius: 10px 0 0 10px;
        }
        td:last-of-type {
          border-radius: 0 10px 10px 0;
          button {
            font-size: 1.2rem;
            background: none;
            border: 0;
            color: #fff;
          }
          button:first-of-type {
            margin-right: 3px;
          }
          button:first-of-type:hover {
            color: #38f9d7;
          }
          button:last-of-type:hover {
            color: #eb2323;
          }
        }
        td.title {
          font-weight: bold;
          font-size: 1.1rem;
        }
        td.price {
          font-weight: bold;
          font-size: 1.1rem;
        }
      }
    }
  }
`;
