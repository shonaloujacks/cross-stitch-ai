import { Box, Typography, MenuItem, Button, Select, TextField, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import type { Pattern } from '../types'

interface PromptFormProps {
  setPattern: React.Dispatch<React.SetStateAction<Pattern | null>>
}


const PromptForm = ({ setPattern }: PromptFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(20);

  const apiBaseURL = 'http://localhost:3001/api/generate'
  
  const resetStates = () => {
    setPrompt('')
    setWidth(20)
    setHeight(20)
  }

  const handleGenerate = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const promptDetails = {
      prompt, height, width
    }

    try {
    const { data } = await axios.post<Pattern>(`${apiBaseURL}/`, promptDetails)
    setPattern(data)
    resetStates();
    }
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response.data === 'string') {
          const message = error.response.data.replace('Something went wrong. Error:', '')
          console.log(message, error)
        }
      }
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
        slotProps={{ htmlInput: { maxLength: 100}}}
        label="prompt (max 100 characters)"
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
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 3}}>Generate</Button>
      </form>
    </Box>

// 20, 30, 40, 50, 60, 70, 80
  );
};

export default PromptForm;