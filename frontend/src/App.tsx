import { useState } from 'react'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';   
import { Box, CircularProgress } from "@mui/material";
import type { Pattern } from './types';
import PromptForm from './components/PromptForm';
import PatternGrid from './components/PatternGrid';
import NotificationBanner from './components/NotificationBanner';
import HeroSection from './components/HeroSection';


const App = () => {
  const [pattern, setPattern] = useState<Pattern | null >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: 'error' | 'success' | ''}>({ message: '', type: ''})

  const notify = (message: string, type: 'error' | 'success') => {
      setNotification({ message: message, type: type })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 10000);
  }


  return (
    <Router>
      {notification.message && <NotificationBanner notification={notification}/>}
      <Box
        component='nav'
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          px: 5,
          py: 2,
        }}>
           <Box sx={{ border: '3px dashed #88c4a8d5', letterSpacing: 2, px: 1.5, py: 0.5, borderRadius: 1, mr: 30, fontSize: 25
            }}>
            CrossStitch Ai
           </Box>
           <Box sx={{ display: 'flex', gap: 3, letterSpacing: 4, alignItems: 'center'}}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: 18, marginRight: 60 }}>home</Link>
             <span style={{ color: '#88c4a8d5', fontSize: 24 }}>✕</span>      
            <Link to="/about" style={{ textDecoration: 'none', color: '#333', fontSize: 18, marginRight: 60, marginLeft: 60 }}>about</Link>
             <span style={{ color: '#88c4a8d5', fontSize: 24 }}>✕</span>     
            <Link to="/create-pattern" style={{ textDecoration: 'none', color: '#333', fontSize: 18, marginLeft: 60 }}>create pattern</Link>
           </Box>
        </Box>
        

      <Routes>
        <Route path='/' element={
          <>
            <HeroSection />
            {isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}><CircularProgress/></Box>)}
            {pattern && !isLoading && <PatternGrid pattern={pattern} setPattern={setPattern} /> }
            {!pattern && <PromptForm setPattern={setPattern} setIsLoading={setIsLoading} notify={notify}/>}
          </>
        } />
        <Route path='/about' element/>
        <Route path='/create-pattern' element={
          <>
          <HeroSection />
           {isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}><CircularProgress/></Box>)}
          <PromptForm setPattern={setPattern} setIsLoading={setIsLoading} notify={notify}/>
          </>
        }/>
      </Routes>
    </Router>
  )
};

export default App;
