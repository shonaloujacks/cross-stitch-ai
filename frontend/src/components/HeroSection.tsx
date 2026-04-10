import { Box, Paper } from '@mui/material';
import pizza from '../assets/images/pizza-box-with-background.jpg';
import beach from '../assets/images/a-sandy-beach-with-a-deckchair-and-sea-in-the-background-clouds-sky.jpg';
import cat from '../assets/images/a-tabby-cat-on-an-armchair.jpg';
import avocado from '../assets/images/avocados-plate.jpg';
import dog from '../assets/images/bernese-mountain-dog-face-on.jpg';
import chilli from '../assets/images/chilli-pepper-lemon.jpg';
import heart from '../assets/images/heart-surrounded-by-wreath-flowers.jpg';
import cactus from '../assets/images/cactus-book.jpg'
import mouse from '../assets/images/white-mouse-wedge-cheese.jpg'
import house from '../assets/images/historic-house-wysteria.jpg'
import man from '../assets/images/happy-old-man-flat-cap.jpg'

const images = [
  { src: heart,   top: '6%',  left: '0%',  mobileLeft: '0%',  rotate: -6, hideOnMobile: false, showOnLargeOnly: false },
  { src: pizza,   top: '13%', left: '15%', mobileLeft: '25%', rotate: 3,  hideOnMobile: false, showOnLargeOnly: false },
  { src: cat,     top: '5%',  left: '30%', mobileLeft: '50%', rotate: -4, hideOnMobile: false, showOnLargeOnly: false },
  { src: avocado, top: '12%', left: '43%', mobileLeft: '75%', rotate: 5,  hideOnMobile: false, showOnLargeOnly: false },
  { src: dog,     top: '4%',  left: '58%', mobileLeft: '60%', rotate: -3, hideOnMobile: true,  showOnLargeOnly: false },
  { src: chilli,  top: '13%', left: '70%', mobileLeft: '72%', rotate: 4,  hideOnMobile: true,  showOnLargeOnly: false },
  { src: beach,   top: '5%',  left: '86%', mobileLeft: '88%', rotate: -5, hideOnMobile: true,  showOnLargeOnly: false },
  { src: cactus,  top: '8%',  left: '7%',  mobileLeft: '7%',  rotate: 4,  hideOnMobile: true,  showOnLargeOnly: true  },
  { src: mouse,   top: '14%', left: '22%', mobileLeft: '22%', rotate: -3, hideOnMobile: true,  showOnLargeOnly: true  },
  { src: house,   top: '6%',  left: '50%', mobileLeft: '50%', rotate: 5,  hideOnMobile: true,  showOnLargeOnly: true  },
  { src: man,     top: '12%', left: '78%', mobileLeft: '78%', rotate: -4, hideOnMobile: true,  showOnLargeOnly: true  },
];

const HeroSection = () => {
  return (
    <Box sx={{ position: 'relative', height: 320, overflow: 'hidden', mt: 1.5 }}>
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
            display: img.showOnLargeOnly ? { xs: 'none', lg: 'block' } : img.hideOnMobile ? { xs: 'none', md: 'block' } : 'block',
          }}
        >
          <img src={img.src} style={{ height: 250, display: 'block' }} />
        </Paper>
      ))}
    </Box>
  );
};

export default HeroSection;
