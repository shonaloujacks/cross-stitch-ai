import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';   
import { Box, CircularProgress, Typography, useMediaQuery, Paper } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import type { Pattern } from './types';
import PromptForm from './components/PromptForm';
import PatternGrid from './components/PatternGrid';
import NotificationBanner from './components/NotificationBanner';
import HeroSection from './components/HeroSection';
import Guidance from './components/Guidance';
import About from './components/About';


const App = () => {
  const [pattern, setPattern] = useState<Pattern | null >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: 'error' | 'success' | ''}>({ message: '', type: ''})
  const [menuOpen, setMenuOpen] = useState(false)


  const notify = (message: string, type: 'error' | 'success') => {
      setNotification({ message: message, type: type })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 15000);
  }

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <Router>
      {notification.message && <NotificationBanner notification={notification}/>}
      <Box
        component='nav'
        sx={{
          position: 'relative',
          top: 0,
          zIndex: 1100,
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
          px: 5,
          py: 1
        }}>
          <Box sx={{ border: '3px dashed #88c4a8d5', letterSpacing: 2, px: 1.5, py: 0.5, borderRadius: 1, mr: 25, fontSize: 25 }}>
            <Link to="/" style={{ textDecoration: 'none',  color: '#333', fontWeight: 'normal'}} onClick={() => setMenuOpen(false)}>CrossStitchAI</Link>
          </Box>
        {isMobile && <MenuIcon onClick={toggleMenu} sx={{color: '#88c4a8d5', mr: 10}}/>} 
        {isMobile && menuOpen ? 
         <Paper elevation={12} sx={{display: 'flex', flexDirection: 'column', position:'absolute', top: '100%', right: 0, backgroundColor: 'white', padding: 2, letterSpacing: 4, alignItems: 'center'}}> 
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ color: '#333', padding: 4 }}>create pattern</Link>
          <span style={{ color: '#88c4a8d5', fontSize: 18 }}>✕</span>    
          <Link to="/guidance" onClick={() => setMenuOpen(false)} style={{ color: '#333', padding: 4 }}>prompt guidance</Link>
          <span style={{ color: '#88c4a8d5', fontSize: 18 }}>✕</span>    
          <Link to="/about" onClick={() => setMenuOpen(false)} style={{ color: '#333', padding: 4 }}>about</Link> 
          </Paper> : null }
        {!isMobile && <Box sx={{ display: 'flex', gap: 3, letterSpacing: 4, alignItems: 'center'}}>     
          <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: 18, marginRight: 60}}>create pattern</Link>
          <span style={{ color: '#88c4a8d5', fontSize: 24 }}>✕</span>     
          <Link to="/guidance" style={{ textDecoration: 'none', color: '#333', fontSize: 18, marginRight: 60, marginLeft: 60 }}>prompt guidance</Link>
          <span style={{ color: '#88c4a8d5', fontSize: 24 }}>✕</span>
          <Link to="/about" style={{ textDecoration: 'none', color: '#333', fontSize: 18, marginLeft: 60 }}>about</Link>   
          </Box>
          }
        </Box>

      <Routes>
        <Route path='/' element={
          <>
            <HeroSection />
            {isLoading && (<Box><Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}><CircularProgress/></Box><Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><Typography style={{color:'#88c4a8d5'}}>Generating your pattern... this may take up to 30 seconds</Typography></Box></Box>)}
            {pattern && !isLoading && <PatternGrid pattern={pattern} setPattern={setPattern} /> }
            {!pattern && <PromptForm setPattern={setPattern} setIsLoading={setIsLoading} notify={notify}/>}
          </>
        } />
        <Route path='/guidance' element={<Guidance />}/>
        <Route path ='/about' element={
          <>
            <HeroSection />
            <About />
          </>
        }/>
      </Routes>
    </Router>
  )
};

export default App;
