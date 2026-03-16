import { useState } from 'react'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';   
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import type { Pattern } from './types';
import PromptForm from './components/PromptForm';
import PatternGrid from './components/PatternGrid';


const App = () => {
  const [pattern, setPattern] = useState<Pattern | null >(null)


  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: "primary", color: "white" }}>
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
            {pattern && <PatternGrid pattern={pattern} /> }
            <PromptForm setPattern={setPattern}/> 
          </> 
        } />
        <Route path='/about' element/>
      </Routes>
    </Router>
  )
};

export default App;
