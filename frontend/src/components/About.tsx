import { Typography, Paper, Box } from "@mui/material"

const About = () => {

  return (
  
  <Paper elevation={5} sx={{ p: 2, mt: 4, maxWidth: 800, ml: 'auto', mr: 'auto', display: 'flex', textAlign: 'center'}}>
    <Box sx={{ border: '3px dashed #88c4a8d5', padding: 4 }}>
    <Typography sx={{color: '#444', mx: 5, mb: 2, mt: 2, letterSpacing: 1 }}>
      CrossStitchAI is a pattern generation tool powered by OpenAI, built to give crafters a quick way to produce basic, small-scale designs. It is not — and does not seek to be — a replacement for the unrivalled skill and artistry of human pattern makers.
    </Typography>
    <span style={{ color: '#88c4a8d5', fontSize: 24}}>✕</span>
    <Typography sx={{color: '#444', mt: 2, mb: 2, mx: 5, letterSpacing: 1 }}>
      CrossStitchAI works best for simple, flat reference patterns. It has limitations, makes mistakes and may not always reflect exactly what you have in mind. It's a handy tool to have in your craft kit, but for anything complex or highly detailed, a human pattern maker will always do it better.
    </Typography>
    
    </Box>
  </Paper>

  ) 
}

export default About;