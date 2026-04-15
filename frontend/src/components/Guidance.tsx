import { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Dialog, DialogContent, Paper, Typography } from '@mui/material';import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import pizza from '../assets/images/pizza-box-with-background.jpg';
import beach from '../assets/images/a-sandy-beach-with-a-deckchair-and-sea-in-the-background-clouds-sky.jpg';
import cat from '../assets/images/a-tabby-cat-on-an-armchair.jpg';
import avocado from '../assets/images/avocados-plate.jpg';
import dog from '../assets/images/bernese-mountain-dog-face-on.jpg';
import chilli from '../assets/images/chilli-pepper-lemon.jpg';
import heart from '../assets/images/heart-surrounded-by-wreath-flowers.jpg';
import cosmo from '../assets/images/cosmopolitan-cocktail.jpg';
import cactus from '../assets/images/cactus-book.jpg';
import pickle from '../assets/images/pickle-jar.jpg';
import egg from '../assets/images/fried-egg-bacon.jpg';
import retriever from '../assets/images/golden-retriever.jpg';
import oldMan from '../assets/images/happy-old-man-flat-cap.jpg';
import house from '../assets/images/historic-house-wysteria.jpg';
import iceCream from '../assets/images/ice-cream-cone.jpg';
import mouse from '../assets/images/white-mouse-wedge-cheese.jpg';
import catFace from '../assets/images/the-face-of-a-tabby-cat-straight-on.jpg';
import ladyBird from '../assets/images/ladybird.jpg'
import lake from '../assets/images/lake.jpg'
import superhero from '../assets/images/superhero.jpg'

const examples = [
  { src: pizza,     prompt: 'a pizza box with a slice of pizza next to it on a table' },
  { src: beach,     prompt: 'a sandy beach with a red and white striped deckchair with a wooden frame and the sea in the background and white clouds in the sky' },
  { src: cat,       prompt: 'a tabby cat on a red armchair' },
  { src: avocado,   prompt: 'a half avocado and slices of avocado on a pale blue plate from above' },
  { src: dog,       prompt: 'a Bernese mountain dog face, straight on' },
  { src: chilli,    prompt: 'a chilli pepper and a lemon cut in half on a blue plate' },
  { src: heart,     prompt: 'a heart surrounded by a wreath of flowers' },
  { src: cosmo,     prompt: 'a cosmopolitan cocktail with an umbrella' },
  { src: cactus,    prompt: 'a cactus next to an open book on a table' },
  { src: pickle,    prompt: 'a jar of pickles' },
  { src: egg,       prompt: 'a fried egg with bacon on a light blue plate from above' },
  { src: retriever, prompt: 'the face of a golden retriever, front-on view' },
  { src: oldMan,    prompt: 'the face of a happy old man with a flat cap on' },
  { src: house,     prompt: 'a historic manor house with purple wisteria growing up the brickwork' },
  { src: iceCream,  prompt: 'a vanilla ice cream with rainbow sprinkles in a wafer cone' },
  { src: mouse,     prompt: 'a white mouse next to a wedge of cheese' },
  { src: catFace,   prompt: 'the face of a tabby cat, front-on view' },
  { src: ladyBird,  prompt: 'a ladybird on a green leaf'},
  { src: lake,      prompt: 'a tranquil lake with mountains in the background and a pale blue sky with clouds'},
  { src: superhero, prompt: 'a female hero in red and blue with a gold cape and mask'}
];

const dos = [
  `use CrossStitchAI for simple patterns — it can't deal with complex designs or lettering and is not a replacement for the talents of human pattern makers`,
  `opt for a broader prompt, ie. "a golden dragon", if you have a basic idea but no specific pattern in mind`,
  `describe the subject clearly and in detail if you have a specific pattern in mind, including composition if relevant ("side view", "front-on", "from above", etc)`,
  'use smaller dimensions (20–40 stitches) for simple shapes with small colour palettes, and larger dimensions (50-80 stitches) for designs that need more detail or a wider colour range',
  'specify any desired colours for elements: ie. "a red apple with a green leaf"',
];

const donts = [
  'include named, copyrighted or trademarked characters — describe their appearance instead, for example, replace "superhero" with a description such as "a hero in red and blue with a gold mask and cape"',
  'use real brand logos or product packaging protected by trademarks',
  'reference famous people or imagery that recalls their likeness',
  'reference photorealistic depictions of real private individuals',
  'include lewd, illegal or offensive content or references, including imagery that depicts hate symbols, drugs, criminality, gore or violence',
];

const Guidance = () => {
  const [selected, setSelected] = useState<{ src: string; prompt: string } | null>(null);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 4 }}>
      <Typography variant="h4" sx={{ letterSpacing: 3, mb: 1, color: '#88c4a8d5' }}>
        prompt guidance
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        follow these tips and tricks to get the best results from CrossStitchAI
      </Typography>

      {/* Dos and Don'ts */}
      <Box sx={{ display: 'flex', gap: 3, mb: 6, flexDirection: { xs: 'column', md: 'row' } }}>
        <Paper elevation={5} sx={{ flex: 1, p: 3 }}>
          <Box sx={{ border: 'dashed 3px #88c4a8d5', p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, letterSpacing: 1 }}><CheckCircleIcon sx={{color:'#88c4a8d5'}}/>   do</Typography>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {dos.map((item, i) => (
              <li key={i} style={{ marginBottom: 10, color: '#444', fontSize: 15 }}>{item}</li>
            ))}
          </ul>
          </Box>
        </Paper>

        <Paper elevation={5} sx={{ flex: 1, p: 3 }}>
          <Box sx={{ border: 'dashed 3px #88c4a8d5', p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, letterSpacing: 1 }}><CancelSharpIcon sx={{color: '#e07070'}}/>   don't</Typography>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {donts.map((item, i) => (
              <li key={i} style={{ marginBottom: 10, color: '#444', fontSize: 15 }}>{item}</li>
            ))}
          </ul>
          <Box sx={{textAlign: 'center'}}>
          <Typography sx={{color: '#e07070', fontSize: 16, letterSpacing: 1, mt: 1, ml: 2, mr: 2 }}>prompts that use the above will be rejected by the generator</Typography>
          </Box>
          </Box>
        </Paper>
      </Box>

      {/* Example patterns */}
      <Typography variant="h5" sx={{ letterSpacing: 2, mb: 3, color: '#88c4a8d5' }}>
        example patterns and prompts
      </Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr', md: '1fr 1fr 1fr 1fr' },
        gap: 2,
      }}>
        {examples.map((example, i) => (
          <Card
            key={i}
            elevation={3}
            onClick={() => setSelected(example)}
            sx={{ cursor: 'pointer', '&:hover': { boxShadow: 8 }, transform: `rotate(${i % 2 === 0 ? 1.5 : -1.5}deg)` }}
          >
            <CardMedia
              component="img"
              image={example.src}
              alt={example.prompt}
              sx={{ aspectRatio: '1 / 1', objectFit: 'contain', backgroundColor: '#f9f9f9' }}
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', fontSize: 13 }}>
                "{example.prompt}"
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Lightbox */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="md">
        <DialogContent sx={{ p: 2, textAlign: 'center' }}>
          <img
            src={selected?.src}
            alt={selected?.prompt}
            style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain' }}
          />
          <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', mt: 1.5, fontSize: 14 }}>
            "{selected?.prompt}"
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Guidance;
