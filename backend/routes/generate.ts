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
  const { finalPrompt, height, width } = req.body;

  let imageResponse;

  try {
  imageResponse = await client.images.generate({
  model: 'gpt-image-1',
  quality: 'medium',
  prompt: `A graphic illustration of ${finalPrompt}. Bold, solid color fills with subject centred. Use distinct, contrasting colors. For images with people, animals or food, use a cartoon style. Pay special attention to key features for animals and people, including eyes and nose. No decorative borders, no color swatches, no palette strips, no labels, no annotations`,
  n: 1,
  size: '1024x1024'
 });
  } catch (error: any) {
    if (error.status === 400 && error.code === 'content_policy_violation') {
      res.status(400).json({ error: 'content_policy_violation', message: 'Prompt was rejected by content policy.'});
      return;
    }
    res.status(502).json({ error: 'image_generation_failed', message: error.message ?? 'Unknown error'});
    return;
  }

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

 // snap near-white pixels to pure white before quantization
 for (let i = 0; i < pixels.length; i++) {
  const p = pixels[i]!
  if (p[0] > 225 && p[1] > 225 && p[2] > 225) {
   pixels[i] = [255, 255, 255]
  }
 }

 const colorCount = (width < 40 || height < 40) ? 8 : 16;
 const colorMap = quantize(pixels, colorCount);
 if (!colorMap) throw new Error('Quantization failed');
 const palette = colorMap.palette();

 const toHex = (n: number) => Math.min(255, Math.max(0, n)).toString(16).padStart(2, '0')

 const symbols = ['★','●','■','◆','✿','❤','✦','▶','✚','☽','☀','♦','✖','⬟','❋','⬡'];

 let symbolIndex = 0;
 const patternPalette = palette.map((rgb) => {
  const dmc = findNearestDMC(rgb[0], rgb[1], rgb[2])
  const isWhite = rgb[0] > 225 && rgb[1] > 225 && rgb[2] > 225;
  const symbol = isWhite ? 'X' : (symbols[symbolIndex++] ?? String(symbolIndex));
  return {
   color: `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`,
   symbol,
   name: dmc.description,
   dmcNumber: dmc.floss,
  }
 })

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

 // remove unused palette entries
 const usedIndices = new Set(grid.flat())
 const keptIndices = palette.map((_, i) => i).filter(i => usedIndices.has(i))
 const finalPalette = keptIndices.map((oldIndex) => ({
  ...patternPalette[oldIndex],
 }))
 const indexRemap: {[key: number]: number} = {}
 keptIndices.forEach((oldIndex, newIndex) => { indexRemap[oldIndex] = newIndex })

 const finalGrid = grid.map(row => row.map(i => indexRemap[i] ?? 0))

 res.json({
   title: finalPrompt,
   width,
   height,
   palette: finalPalette,
   grid: finalGrid
 });

});

export default router;