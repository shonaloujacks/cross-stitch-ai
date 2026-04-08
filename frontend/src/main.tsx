import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: "#88c4a8d5",
    },
    secondary: {
      main: "#d5dac1"
    }
  }

})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
       <App />
    </ThemeProvider>
  </StrictMode>,
)
