import express from 'express';
import OpenAI from 'openai';
import sharp from 'sharp';
import quantize from 'quantize';
import dmcColors from '../data/dmc.json'

const router = express.Router();
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});

const findNearestDMC = (r: number, g: number, b: number) => {
  let nearest = dmcColors[0]!
  let minDistance = Infinity

  for (const color of dmcColors) {
    const distance = Math.sqrt(
      (r - color.r) ** 2 + (g - color.g) ** 2 + (b - color.b) ** 2
    )
    if (distance < minDistance) {
      minDistance = distance
      nearest = color
    }
  }
  return nearest;
 }

router.post('/', async (req, res) => {
  console.log('request received', req.body)
  const { prompt, height, width } = req.body
  

 const imageResponse = await client.images.generate({
  model: 'gpt-image-1',
  quality: 'medium',
  prompt: `A flat, graphic illustration of ${prompt}. Bold solid color fills with subject centred. No decorative borders, no color swatches, no palette strips, no labels, no annotations`,
  n: 1,
  size: '1024x1024'
 });

 const b64 = imageResponse.data?.[0]?.b64_json;
 if (!b64) throw new Error('gpt-image-1 did not return image data');
 console.log('usage', JSON.stringify(imageResponse.usage))

const buffer = Buffer.from(b64, 'base64'); 
                  
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

 const colorCount = (width < 40 || height < 40) ? 8 : 12;
 const colorMap = quantize(pixels, colorCount);
 if (!colorMap) throw new Error('Quantization failed');
 const palette = colorMap.palette();

 const patternPalette = palette.map((rgb, i) => {
    const dmc = findNearestDMC(rgb[0], rgb[1], rgb[2])
    return {
      color: `#${rgb[0].toString(16).padStart(2,'0')}${rgb[1].toString(16).padStart(2,'0')}${rgb[2].toString(16).padStart(2,'0')}`,
      symbol: String.fromCharCode(65 + i),
      name: dmc.description,
      dmcNumber: dmc.floss,
    }
 })

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
   grid
 });

 console.log('THIS IS RES.JSON', res.json)

});

export default router;