import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './App.css';
import LayoutContextProvider from './context/LayoutContextProvider';

const App = () => {
  return (
    <BrowserRouter>
      <LayoutContextProvider>
        <AppRoutes />
      </LayoutContextProvider>
    </BrowserRouter>
  )
}

export default App
