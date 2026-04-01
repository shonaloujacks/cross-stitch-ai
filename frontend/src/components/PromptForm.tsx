import { Box, Typography, MenuItem, Button, Select, TextField, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import type { Pattern } from '../types'

interface PromptFormProps {
  setPattern: React.Dispatch<React.SetStateAction<Pattern | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notify: (message: string, type: "error" | "success") => void;
}


const PromptForm = ({ setPattern, setIsLoading, notify }: PromptFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(20);
  const [whiteBackground, setWhiteBackground] = useState(false);

  const apiBaseURL = 'http://localhost:3001/api/generate'
  
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

    <Box sx={{ p: 2, mt: 1, border: '1px dashed', borderColor: 'grey.500', borderRadius: 4}}>
      <Typography variant="h5">Describe the cross-stitch pattern you want to generate</Typography>
      <form onSubmit={handleGenerate}>
        <TextField
        variant="standard"
        required
        sx={{ display: 'block', mb: 2}}
        slotProps={{ htmlInput: { maxLength: 300}}}
        label="prompt (max 300 characters)"
        value={prompt}
        onChange={event => setPrompt(event.target.value)}
        />
        <FormControl fullWidth variant="standard" sx={{ '& .MuiSelect-select': { color: 'rgba(0, 0, 0, 0.6)' } }}>
          <InputLabel id="width-label">Width in stitches</InputLabel>
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
          <InputLabel id="height-label">Height in stitches</InputLabel>
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
          <FormControlLabel control={<Checkbox checked={whiteBackground} onChange={event => setWhiteBackground(event.target.checked)}/>} label="Set white background"/>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 3}}>Generate</Button>
      </form>
    </Box>
  );
};

export default PromptForm;