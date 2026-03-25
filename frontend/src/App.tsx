import { useState } from 'react'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';   
import { AppBar, Toolbar, Button, Box, CircularProgress } from "@mui/material";
import type { Pattern } from './types';
import PromptForm from './components/PromptForm';
import PatternGrid from './components/PatternGrid';
import NotificationBanner from './components/NotificationBanner';


const App = () => {
  const [pattern, setPattern] = useState<Pattern | null >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: 'error' | 'success' | ''}>({ message: '', type: ''})

  const notify = (message: string, type: 'error' | 'success') => {
      setNotification({ message: message, type: type })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000);
  }


  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: "primary", color: "white" }}>
        {notification.message && <NotificationBanner notification={notification}/>} 
        <Toolbar>
           <Box sx={{ border: '2px dashed white', px: 1.5, py: 0.5, borderRadius: 1, mr: 2, fontSize: 25 }}>
            CrossStitch Ai
           </Box>
           <Box>
            <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: '#e0cee2'}}}>generate pattern</Button>
            <Button color="inherit" component={Link} to="/about" sx={{ '&:hover': { color: '#e0cee2'}}}>about</Button>
           </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path='/' element={ 
          <>
            {isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}><CircularProgress/></Box>)}
            {pattern && !isLoading && <PatternGrid pattern={pattern} /> }
            <PromptForm setPattern={setPattern} setIsLoading={setIsLoading} notify={notify}/> 
          </> 
        } />
        <Route path='/about' element/>
      </Routes>
    </Router>
  )
};

export default App;
