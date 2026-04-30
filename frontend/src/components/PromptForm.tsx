import { Paper, Link, Typography, Box, MenuItem, Button, Select, TextField, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import type { Pattern } from '../types'
import { useNavigate, Link as RouterLink } from 'react-router';

interface PromptFormProps {
  setPattern: React.Dispatch<React.SetStateAction<Pattern | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notify: (message: string, type: "error" | "success") => void;
}


const PromptForm = ({ setPattern, setIsLoading, notify }: PromptFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50);
  const [whiteBackground, setWhiteBackground] = useState(false);

  const apiBaseURL = import.meta.env.VITE_API_URL

  const navigate = useNavigate()
  
  const resetStates = () => {
    setPrompt('')
    setWidth(20)
    setHeight(20)
    setWhiteBackground(false)
  
  }

  const handleGenerate = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finalPrompt = whiteBackground ? prompt + ' on a plain white #ffffff background' : prompt

    const promptDetails = {
      finalPrompt, height, width
    }
    setIsLoading(true);
    
    try {
    const { data } = await axios.post<Pattern>(`${apiBaseURL}/`, promptDetails)
    setPattern(data);
    navigate('/')
    setIsLoading(false);
    resetStates();
    }
    catch (error: any) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        notify(data.message.replace(/^\d{3}\s/, ''), 'error')
      } else if (error instanceof Error){
        notify(error.message, 'error')
      } else {
        notify('An unexpected error occured', 'error')
      }
      resetStates();
    }
  };

  return (

      <Paper elevation={5} sx={{ p: 2, mt: 1, mb: 2, maxWidth: 800, mx: 'auto' }}>
        <Box sx={{ border:'3px dashed #88c4a8d5', p: {xs: 1, sm: 2, md: 4, lg: 5}}}>
        <Typography variant="h5" color='#444' sx={{ letterSpacing: 2, mb: 2}}>describe the pattern you want to generate</Typography>
          <Typography color='#444' sx={{ mt: 1.5, mb: 2, letterSpacing: 1}}>before you begin, <Link component={RouterLink} to='/guidance' underline='none' sx={{ color: '#88c4a8d5', fontWeight: 'bold', '&:hover': { color: '#666666'}}}>learn how to structure your prompt</Link> to get the best output</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5, borderBottom: '3px dashed #88c4a8d5' }}></Box>
        <form onSubmit={handleGenerate}>
          <TextField
          fullWidth
          variant="standard"
          required
          sx={{ display: 'block', mb: 1.5}}
          slotProps={{ htmlInput: { maxLength: 300}}}
          label="prompt (max 300 characters)"
          value={prompt}
          id="prompt-form"
          onChange={event => setPrompt(event.target.value)}
          />
          <FormControl fullWidth variant="standard" sx={{ '& .MuiSelect-select': { color: 'rgba(0, 0, 0, 0.6)' } }}>
            <InputLabel id="width-label">width in stitches</InputLabel>
            <Select
            labelId="width-label"
            required
            value={width}
            onChange={event => setWidth(event.target.value)}>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={70}>70</MenuItem>
            <MenuItem value={80}>80</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" sx={{ '& .MuiSelect-select': { color: 'rgba(0, 0, 0, 0.6)' } }}>
            <InputLabel id="height-label">height in stitches</InputLabel>
            <Select
            labelId="height-label"
            required
            value={height}
            onChange={event => setHeight(event.target.value)}>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={70}>70</MenuItem>
            <MenuItem value={80}>80</MenuItem>
            </Select>
            <FormControlLabel sx={{color: '#666666', '& .MuiFormControlLabel-label': { fontSize: 14 }}}control={<Checkbox checked={whiteBackground} onChange={event => setWhiteBackground(event.target.checked)}/>} label="set white background"/>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button type="submit" variant="contained" sx={{ color: '#ffffff'}}>generate</Button>
          </Box>
        </form>
        </Box>
      </Paper>
  );
};

export default PromptForm;