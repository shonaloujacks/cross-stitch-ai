import { useState } from 'react'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';   
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import type { Pattern } from './types';


const App = () => {
  const [pattern, setPattern] = useState<Pattern | null >(null)

  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: "primary", color: "white" }}>
        <Toolbar>
           <Box sx={{ border: '2px dashed white', px: 1.5, py: 0.5, borderRadius: 1, mr: 2, fontSize: 20 }}>
            CrossStitch Ai
           </Box>
           <Box>
            <Button color="inherit" component={Link} to="/">generate pattern</Button>
            <Button color="inherit" component={Link} to="/about">about</Button>
           </Box>
        </Toolbar>
      </AppBar>
    </Router>
  )
}

export default App
