import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  *{
    margin: 0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }
  html, border-style, #root {
    height: 100%;
  } 
  body{
    font: 14px 'Noto Sans', sans-serif;
    background: #464646;
    color: #e6e6e6;
    -webkit-font-smoothing: antaliased !important;
  }
  textarea{
    font: 14px 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antaliased !important;
  }
  ul{
    list-style: none;
  }
`;
