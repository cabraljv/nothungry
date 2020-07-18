import React from 'react'
import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/auth'
import Routes from './routes'
export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
