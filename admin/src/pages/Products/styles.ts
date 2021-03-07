import styled from 'styled-components';

import theme from '../../styles/themes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  header {
    margin: 0 30px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 1.5rem;
      text-align: center;
    }
    button {
      padding: 0 15px;
      border: 0;
      background: ${theme.primary};
      border-radius: 5px;
      transition: opacity 0.2s;
      p {
        font-size: 0.9rem;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        color: ${theme.dark_black};
        strong {
          margin-left: 4px;
        }
      }
    }
    button:hover {
      opacity: 0.8;
    }
  }
  div.modal-edit-content {
    min-width: 400px;
    width: 50%;
    display: flex;
    flex-direction: column;
    form {
      display: flex;
      flex-direction: column;
      select {
        margin-top: 10px;
        height: 35px;
        font-size: 1rem;
        background: ${theme.light_gray};
        border: 0;
        border-radius: 5px;
        color: #fff;
      }
      input,
      textarea {
        background: ${theme.light_gray};
        border: 0;
        border-radius: 4px;
        padding: 8px 15px;
        font-size: 1rem;
        color: #fff;
      }
      textarea {
        resize: vertical;
        height: 100px;
      }
      div.image-preview {
        margin: 0 auto;
        display: flex;
        height: 200px;
        width: 200px;
        position: relative;
        label {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 5px;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          cursor: pointer;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          object-fit: cover;
        }
        label:hover {
          opacity: 0.9;
        }
        input {
          display: none;
          width: 100%;
          height: 100%;
        }
      }
    }
    div.buttons {
      margin-top: 20px;
      margin-left: auto;
      button {
        padding: 7px 12px;
        border: 0;
        font-size: 1rem;
      }
      button:first-of-type {
        background: none;
        color: #fff;
        opacity: 0.6;
      }
      button:first-of-type:hover {
        opacity: 0.2;
      }
      button:last-of-type {
        background: ${theme.primary};
        border-radius: 5px;
        margin-right: 10px;
      }
      button:last-of-type:hover {
        opacity: 0.8;
      }
    }
  }
  div.modal-content {
    p {
      font-size: 1.2rem;
    }
    div.buttons {
      margin-top: 20px;
      display: flex;
      button:first-of-type {
        margin-right: 20px;
        border: none;
        background: none;
        color: #fff;
        opacity: 0.5;
      }
      button:last-of-type {
        padding: 4px 10px;
        font-size: 1rem;
        color: #fff;
        background: linear-gradient(to bottom right, #ff5858 0%, #f09819 100%);
        border: 0;
        border-radius: 5px;
      }
      button:last-of-type:hover {
        opacity: 0.9;
      }
    }
  }
  table {
    margin: 20px 30px;
    tr {
      display: grid;
      grid-template-columns: 100px 1.5fr 5fr 100px 80px;
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
            height: 100%;
            width: 100%;
            min-height: 80px;
            object-fit: cover;
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
