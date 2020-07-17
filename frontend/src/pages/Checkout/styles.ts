import styled from 'styled-components'

export const Container = styled.div`
  header{
    display: flex;
    height: 130px;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
    background: #2D2D2D;
    div{
      display: flex;
      align-items: center;
      img{
        width: 70px;
      }
      h1{
        padding-left: 5px;
        color: #3BF4BC;
        font-size: 1.3rem;
      }
    }
    h2{
      font-size: 1.7rem;
    }
  }
`
export const Content = styled.div`
  margin: 0 30px;
  padding-top: 20px;
  h6{
    padding-top: 15px;
    padding-bottom: 5px;
    font-size: 0.9rem;
  }
  textarea::placeholder{
    color: #E9E9E9
  }
  a{
    width: 100%;
    padding: 20px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: #2D2D2D;
    text-decoration: none;
  }
  textarea{
    width: 100%;
    height: 100px;
    padding: 5px;
    border-radius: 10px;
    background: #858585;
    resize: none;
    color: #fff;
  }
  div#delivery{
    background: linear-gradient(to bottom right, #43E97B 0%, #38F9D7 100%);
    border: 0;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 5px rgba(0,0,0,.2);
    display: flex;
    align-content: center;
    justify-items: center;
  }
  div#total{
    margin-top: 20px;
    margin-bottom: 40px;
    display: flex;
    p:first-child{
      color: #3BF4BC;
      font-weight: bold;
      padding-top: 4px;
      padding-right: 2px;
      font-size: 0.8rem;
    }
    p:last-child{
      font-size:2rem;
      font-weight: bold;
    }
  }
`
