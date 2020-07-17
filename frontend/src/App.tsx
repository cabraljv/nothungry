import React from 'react'
import GlobalStyles from './styles/global'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes />
    </BrowserRouter>)
}

export default App
