import { Box, Paper, useMediaQuery } from '@mui/material';
import pizza from '../assets/images/pizza-box-with-background.jpg';
import beach from '../assets/images/a-sandy-beach-with-a-deckchair-and-sea-in-the-background-clouds-sky.jpg';
import cat from '../assets/images/a-tabby-cat-on-an-armchair.jpg';
import avocado from '../assets/images/avocados-plate.jpg';
import dog from '../assets/images/bernese-mountain-dog-face-on.jpg';
import chilli from '../assets/images/chilli-pepper-lemon.jpg';
import heart from '../assets/images/heart-surrounded-by-wreath-flowers.jpg';


const desktopImages = [
  { src: heart,   top: '6%',  left: '0%',  rotate: -6 },
  { src: pizza,   top: '13%', left: '15%', rotate: 3  },
  { src: cat,     top: '5%',  left: '30%', rotate: -4 },
  { src: avocado, top: '12%', left: '43%', rotate: 5 },
  { src: dog,     top: '4%',  left: '58%', rotate: -3 },
  { src: chilli,  top: '13%', left: '70%', rotate: 4 },
  { src: beach,   top: '5%',  left: '86%', rotate: -5 },

];

const tabletImages = [
  { src: heart,   top: '6%',  left: '1%',  rotate: -6 },
  { src: pizza,   top: '13%', left: '20%', rotate: 3  },
  { src: dog, top: '9%', left: '39%', rotate: -3 },
  { src: chilli,  top: '15%', left: '58%', rotate: 4 },
  { src: beach,   top: '5%',  left: '80%', rotate: -5 },
]

const mobileImages = [
  { src: heart,   top: '4%',  left: '2%', rotate: 3  },
  { src: avocado, top: '9%', left: '30%', rotate: -4 },
  { src: beach,   top: '5%',  left: '67%', rotate: 6 },
]


const HeroSection = () => {

  const isTablet = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isXS = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const activeImages = isXS ? mobileImages : isMobile ? mobileImages : isTablet ? tabletImages : desktopImages

  return (
    <Box sx={{  overflow: 'hidden', position: 'relative', height: isXS ? 220 : 320, maxWidth: 1700, mx: 'auto', mt: 1.5, mb: isMobile? 2 : 10 }}>
      {activeImages.map((img, i) => (
        <Paper
          key={i}
          elevation={10}
          sx={{
            position: 'absolute',
            top: img.top,
            left: img.left,
            transform: `rotate(${img.rotate}deg)`,
            lineHeight: 0,
          }}
        >
          <img src={img.src} style={{ height: isXS ? 170 : 250, display: 'block' }} />
        </Paper>
      ))}
    </Box>
  );
};

export default HeroSection;
