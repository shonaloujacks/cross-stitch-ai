import { Box, Paper } from '@mui/material';
import pizza from '../assets/images/pizza-box-with-background.jpg';
import beach from '../assets/images/a-sandy-beach-with-a-deckchair-and-sea-in-the-background-clouds-sky.jpg';
import cat from '../assets/images/a-tabby-cat-on-an-armchair.jpg';
import avocado from '../assets/images/avocados-plate.jpg';
import dog from '../assets/images/bernese-mountain-dog-face-on.jpg';
import chilli from '../assets/images/chilli-pepper-lemon.jpg';
import heart from '../assets/images/heart-surrounded-by-wreath-flowers.jpg';

const images = [
  { src: heart,   top: '5%',  left: '0%',  mobileLeft: '0%',  rotate: -6, hideOnMobile: false },
  { src: pizza,   top: '20%', left: '15%', mobileLeft: '25%', rotate: 3,  hideOnMobile: false },
  { src: cat,     top: '3%',  left: '30%', mobileLeft: '50%', rotate: -4, hideOnMobile: false },
  { src: avocado, top: '22%', left: '45%', mobileLeft: '75%', rotate: 5,  hideOnMobile: false },
  { src: dog,     top: '4%',  left: '60%', mobileLeft: '60%', rotate: -3, hideOnMobile: true  },
  { src: chilli,  top: '20%', left: '72%', mobileLeft: '72%', rotate: 4,  hideOnMobile: true  },
  { src: beach,   top: '5%',  left: '88%', mobileLeft: '88%', rotate: -5, hideOnMobile: true  },
];

const HeroSection = () => {
  return (
    <Box sx={{ position: 'relative', height: 350, overflow: 'hidden', mb: 1.5, mt: 1.5 }}>
      {images.map((img, i) => (
        <Paper
          key={i}
          elevation={10}
          sx={{
            position: 'absolute',
            top: img.top,
            left: { xs: img.mobileLeft, md: img.left },
            transform: `rotate(${img.rotate}deg)`,
            lineHeight: 0,
            display: img.hideOnMobile ? { xs: 'none', md: 'block' } : 'block',
          }}
        >
          <img src={img.src} style={{ height: 250, display: 'block' }} />
        </Paper>
      ))}
    </Box>
  );
};

export default HeroSection;
