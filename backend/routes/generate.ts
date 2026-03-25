import express from 'express';
import OpenAI from 'openai';
import sharp from 'sharp';
import quantize from 'quantize';
import axios from 'axios';

const router = express.Router();
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});

router.post('/', async (req, res) => {
  console.log('request received', req.body)
  const { prompt, height, width } = req.body
  

 const imageResponse = await client.images.generate({
  model: 'dall-e-3',
  prompt: `Flat, cartoon-style illustration of ${prompt}, plain white background, maximum color saturation, no gradients, no shading, high contrast between all elements, centered`,
  n: 1,
  size: '1024x1024'
 });

 const imageURL = imageResponse.data?.[0]?.url;
 if (!imageURL) throw new Error('DALL-E did not return an image URL');
 console.log('this is imageURL', imageURL)

 const response = await fetch(imageURL);
 const buffer = Buffer.from(await response.arrayBuffer());
 
                  
const { data } = await sharp(buffer)                                                                                                    
  .resize(width, height, { fit: 'cover', kernel: sharp.kernel.nearest })
  .sharpen({ sigma: 3 })                                                                                                                
  .removeAlpha()
  .raw()                                                                                                                                
  .toBuffer({ resolveWithObject: true });

 const pixels: [number, number, number][] = [];

 for (let i = 0; i < data.length; i += 3) {
  pixels.push([data[i] as number, data[i+1] as number, data[i+2] as number ])
 }

 const colorCount = (width < 40 || height < 40) ? 6 : 12;
 const colorMap = quantize(pixels, colorCount);
 if (!colorMap) throw new Error('Quantization failed');
 const palette = colorMap.palette(); 

 const patternPalette = palette.map((rgb, i) => ({
  color: `#${rgb[0].toString(16).padStart(2,'0')}${rgb[1].toString(16).padStart(2,'0')}${rgb[2].toString(16).padStart(2,'0')}`,
  symbol: String.fromCharCode(65 + i),
  name: `Color ${i + 1}`,
 }))

 console.log('this is patternPalette', patternPalette)

 const grid: number[][] = [];

 for (let row = 0; row < height; row++){
  const gridRow: number[] = [];
  for (let col = 0; col < width; col++){
    const pixel = pixels[row * width + col] as [number, number, number];
    const mapped = colorMap.map(pixel);
    const index = palette.findIndex(p => p[0] === mapped[0] && p[1] === mapped[1] && p[2] === mapped[2]);
    gridRow.push(index);
  }
  grid.push(gridRow);
 }

 res.json({
   title: prompt,
   width,
   height,
   palette: patternPalette,
   grid,
 });

 console.log('THIS IS RES.JSON', res.json)

});

export default router;