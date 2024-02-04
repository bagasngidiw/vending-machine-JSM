import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


// import './index.css'
const theme = extendTheme({
  fonts: {
    body: 'Montserrat, sans-serif',
    heading: 'Montserrat, sans-serif',
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
)
